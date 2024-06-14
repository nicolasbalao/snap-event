import { v2 as cloudinary } from "cloudinary";
import { unstable_cache, unstable_noStore } from "next/cache";
import extractUserFromSession from "../actions/extract-cookie-session.action";
import ImageCard from "../components/ImageCard";
import SearchBar from "../components/searchBar";
import Gallery from "../components/Gallery";

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
  const user: any = await extractUserFromSession();
  const isAdmin: boolean = user?.role === "admin";
  const query = searchParams.query;
  const tags = await getTags();

  let expression = "resource_type:image";

  if (query) {
    expression = `${expression} AND tags=${query}`;
  }

  const resources = await cachedGallery(expression);

  return (
    <main className="p-0 w-full">
      <div className="p-2 mb-4">
        <SearchBar tags={tags} selectedTag={query} isAdmin={isAdmin} />
      </div>
      <Gallery searchTag={query} isAdmin={isAdmin} />
    </main>
  );
}
