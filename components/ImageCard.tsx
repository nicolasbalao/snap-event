import Link from "next/link";
import { imageData } from "../app/page";
import CCldImage from "./CCldImage";
import DownloadButton from "./DownloadButton";
import FavTag from "./favTag";
import { revalidateTag } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import { Badge } from "./ui/badge";
import { PiTrashSimpleLight } from "react-icons/pi";

type ImageCardProps = {
  image: imageData;
  isAdmin: boolean;
  width: number;
  height: number;
};

function isFav(tags: string[]) {
  if (!tags) return false;
  return tags.includes("favoris");
}

export default function ImageCard(props: ImageCardProps) {
  const { image, isAdmin, width, height } = props;

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
      <div key={image.url}>
        <Link
          href={`photos/${image.public_id}`}
          key={image.public_id}
          scroll={false}
        >
          <CCldImage
            src={image.public_id}
            alt="image"
            sizes="100vw"
            height="500"
            width="600"
            crop="fill"
            className="md:rounded"
          />
        </Link>
        <div className="flex justify-between items-center p-2">
          {isAdmin && (
            <div className="flex gap-2">
              <FavTag publicId={image.public_id} isFav={isFav(image.tags)} />
              <form action={deleteImage}>
                <input type="hidden" name="public_id" value={image.public_id} />
                <button type="submit">
                  <Badge variant="outline">
                    <PiTrashSimpleLight size="1.2rem" fontWeight={"1.2rem"} />
                  </Badge>
                </button>
              </form>
            </div>
          )}
          <DownloadButton className="ml-auto" url={image.secure_url} />
        </div>
      </div>
    </>
  );
}
