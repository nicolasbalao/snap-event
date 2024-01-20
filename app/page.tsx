import { v2 as cloudinary } from "cloudinary";
import CCldImage from "./Components/CCldImage";
import UploadButton from "./Components/UploadButton";

type imageData = {
  public_id: string;
};

export default async function GalleryPage() {
  const { resources } = await cloudinary.search
    .expression("resource_type:image")
    .sort_by("created_at", "desc")
    .max_results(30)
    .execute();

  return (
    <main>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl">Gallery page</h1>
        <UploadButton />
        <button className="bg-lime-600 text-white p-2 rounded">
          <a href="/link">Create link</a>
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {resources &&
          resources.map((image: imageData) => (
            <CCldImage
              src={image.public_id}
              alt="image"
              height={100}
              width={100}
              key={image.public_id}
            />
          ))}
      </div>
    </main>
  );
}
