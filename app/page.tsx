import { v2 as cloudinary } from "cloudinary";
import CCldImage from "../components/CCldImage";
import UploadButton from "../components/UploadButton";
import Link from "next/link";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import TagNav from "../components/TagsNav";

type imageData = {
  public_id: string;
};

export const dynamic = "force-dynamic";

async function getGallery(expression: string) {
  const { resources } = await cloudinary.search
    .expression(expression)
    .sort_by("created_at", "desc")
    .max_results(30)
    .execute();

  return resources;
}

const cachedGallery = unstable_cache(
  async (expression: string) => await getGallery(expression),
  ["my-gallery"],
  {
    tags: ["gallery"],
    revalidate: 60,
  }
);

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: any;
}) {
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

  return (
    <main>
      <div className="flex justify-between items-center mb-6">
        <div>
          <form action={search}>
            <input type="search" name="query" />
          </form>
        </div>
        <h1 className="text-3xl">Gallery page</h1>
        <UploadButton />
        <button className="bg-lime-600 text-white p-2 rounded">
          <a href="/link">Create link</a>
        </button>
        <button className="bg-lime-600 text-white p-2 rounded">
          <Link href="/magic-link/generate">Create Magic link</Link>
        </button>
      </div>
      <TagNav />
      <div className="grid grid-cols-4 gap-4">
        {resources &&
          resources.map((image: imageData) => (
            <Link href={`photos/${image.public_id}`} key={image.public_id}>
              <CCldImage
                src={image.public_id}
                alt="image"
                height={100}
                width={100}
              />
            </Link>
          ))}
      </div>
    </main>
  );
}
