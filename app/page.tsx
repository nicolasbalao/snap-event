import { v2 as cloudinary } from "cloudinary";
import CCldImage from "../components/CCldImage";
import UploadButton from "../components/UploadButton";
import Link from "next/link";
import { revalidateTag, unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import TagNav from "../components/TagsNav";
import extractCookieSession from "../actions/extract-cookie-session.action";
import DownloadButton from "../components/DownloadButton";
import FavTag from "../components/favTag";

type imageData = {
  public_id: string;
  url: string;
  secure_url: string;
  tags: string[];
};

export const dynamic = "force-dynamic";

async function getGallery(expression: string) {
  const { resources } = await cloudinary.search
    .expression(expression)
    .with_field("tags")
    .sort_by("created_at", "desc")
    .max_results(30)
    .execute();

  return resources;
}

const cachedGallery = unstable_cache(
  async (expression: string) => await getGallery(expression),
  ["my-gallery"],
  {
    tags: ["gallery", "tags"],
    revalidate: 60,
  }
);

function isFav(tags: string[]) {
  console.log("refresh", new Date().toLocaleString());
  return tags.includes("favoris");
}

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const session: any = await extractCookieSession();
  const isAdmin: boolean = session?.role === "admin";
  const query = searchParams.query;

  let expression = "resource_type:image";

  if (query) {
    expression = `${expression} AND tags=${query}`;
  }

  const resources = await cachedGallery(expression);

  async function search(data: FormData) {
    "use server";
    redirect(`/?query=${data.get("query")}`);
  }

  async function deleteImage(data: any) {
    "use server";
    if (!isAdmin) {
      return null;
    }
    const public_id = data.get("public_id");
    const { result }: { result: string } = await cloudinary.uploader.destroy(
      public_id
    );

    if (result === "ok") {
      revalidateTag("gallery");
    }
  }

  return (
    <main>
      <div className="flex justify-between items-center mb-6">
        <div>
          <form action={search}>
            <input type="search" name="query" />
          </form>
        </div>
        <h1 className="text-3xl">Gallery page</h1>
        {isAdmin && (
          <div>
            <UploadButton />
            <button className="bg-lime-600 text-white p-2 rounded">
              <a href="/link">Create link</a>
            </button>
            <button className="bg-lime-600 text-white p-2 rounded">
              <Link href="/magic-link/generate">Create Magic link</Link>
            </button>
          </div>
        )}
      </div>
      <TagNav />
      <div className="grid grid-cols-4 gap-4">
        {resources &&
          resources.map((image: imageData) => (
            <div key={image.url}>
              <Link href={`photos/${image.public_id}`} key={image.public_id}>
                <CCldImage
                  src={image.public_id}
                  alt="image"
                  height={100}
                  width={100}
                />
              </Link>
              <FavTag publicId={image.public_id} isFav={isFav(image.tags)} />
              <DownloadButton url={image.secure_url} />
              {isAdmin && (
                <form action={deleteImage}>
                  <input
                    type="hidden"
                    name="public_id"
                    value={image.public_id}
                  />
                  <button type="submit">X</button>
                </form>
              )}
            </div>
          ))}
      </div>
    </main>
  );
}
