import Link from "next/link";
import { imageData } from "../app/page";
import CCldImage from "./CCldImage";
import DownloadButton from "./DownloadButton";
import FavTag from "./favTag";
import { revalidateTag } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

type ImageCardProps = {
  image: imageData;
  isAdmin: boolean;
};

function isFav(tags: string[]) {
  if (!tags) return false;
  return tags.includes("favoris");
}

export default function ImageCard(props: ImageCardProps) {
  const { image, isAdmin } = props;

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
    <>
      <div key={image.url} className="w-full">
        <Link href={`photos/${image.public_id}`} key={image.public_id}>
          <CCldImage
            className="w-full"
            src={image.public_id}
            alt="image"
            width={300}
            height={300}
          />
        </Link>
        <div className="flex justify-between p-2">
          <div className="flex">
            <FavTag publicId={image.public_id} isFav={isFav(image.tags)} />
            {isAdmin && (
              <form action={deleteImage}>
                <input type="hidden" name="public_id" value={image.public_id} />
                <button type="submit">X</button>
              </form>
            )}
          </div>
          <DownloadButton url={image.secure_url} />
        </div>
      </div>
    </>
  );
}
