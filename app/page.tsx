import { v2 as cloudinary } from "cloudinary";
import CCldImage from "../components/CCldImage";
import UploadButton from "../components/UploadButton";
import Link from "next/link";
import { unstable_cache } from "next/cache";

type imageData = {
  public_id: string;
};

export const dynamic = "auto";

async function getGallery() {
  const { resources } = await cloudinary.search
    .expression("resource_type:image")
    .sort_by("created_at", "desc")
    .max_results(30)
    .execute();

  return resources;
}

const cachedGallery = unstable_cache(
  async () => await getGallery(),
  ["my-gallery"],
  { tags: ["gallery"], revalidate: 60 }
);

export default async function GalleryPage() {
  const resources = await cachedGallery();

  return (
    <main>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl">Gallery page</h1>
        <UploadButton />
        <button className="bg-lime-600 text-white p-2 rounded">
          <a href="/link">Create link</a>
        </button>
        <button className="bg-lime-600 text-white p-2 rounded">
          <Link href="/magic-link/generate">Create Magic link</Link>
        </button>
      </div>
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
