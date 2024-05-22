import { v2 as cloudinary } from "cloudinary";
import UploadButton from "../components/UploadButton";
import Link from "next/link";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import TagNav from "../components/TagsNav";
import extractCookieSession from "../actions/extract-cookie-session.action";
import ImageCard from "../components/ImageCard";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

export type imageData = {
  public_id: string;
  url: string;
  secure_url: string;
  tags: string[];
  width: number;
  height: number;
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

  return (
    <main className="p-0">
      <div className="p-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {/* <div>
          <form action={search}>
            <input type="search" name="query" />
          </form>
        </div>
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
        )} */}
        <TagNav selectedTag={query} />
      </div>
      <div className="flex flex-col  items-center w-full md:grid grid-cols-4 gap-6">
        {resources &&
          resources.map((image: imageData) => (
            <ImageCard
              image={image}
              isAdmin={isAdmin}
              width={image.width}
              height={image.height}
              key={image.public_id}
            />
          ))}
      </div>
    </main>
  );
}
