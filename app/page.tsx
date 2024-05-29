import { v2 as cloudinary } from "cloudinary";
import { unstable_cache, unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import TagNav from "../components/TagsNav";
import extractCookieSession from "../actions/extract-cookie-session.action";
import ImageCard from "../components/ImageCard";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import SearchBar from "../components/searchBar";
import { DialogMagicLink } from "../components/DialogMagicLink";
import { DialogShareUpload } from "../components/DialogShareUpload";

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

async function getTags() {
  unstable_noStore();
  const { tags }: { tags: string[] } = await cloudinary.api.tags();
  return tags;
}

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const session: any = await extractCookieSession();
  const isAdmin: boolean = session?.role === "admin";
  const query = searchParams.query;
  const tags = await getTags();

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
      <div className="p-2 mb-4">
        <SearchBar tags={tags} selectedTag={query} />
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
