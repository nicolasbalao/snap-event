"use client";
import Link from "next/link";
import { imageData } from "../app/page";
import CCldImage from "./CCldImage";
import DownloadButton from "./DownloadButton";
import FavTag from "./favTag";
import { Badge } from "./ui/badge";
import { PiTrashSimpleLight } from "react-icons/pi";
import { AlertDialogConfirmation } from "./AlertConfirmation";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

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
  const { image, isAdmin } = props;

  const router = useRouter();
  const { toast } = useToast();

  const deleteImage = () => {
    fetch(`/api/photos/${image.public_id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.result === "ok") {
          console.info(`Image deleted ${image.public_id}`);
          toast({
            title: "Image supprimée avec succès",
          });
          router.refresh();
        } else {
          console.error(`Error deleting image ${image.public_id}`);
          toast({
            title: "Erreur",
            description:
              "Une erreur est survenue lors de la suppression de l'image",
            variant: "destructive",
          });
        }
      });
  };

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
              <AlertDialogConfirmation onConfirm={() => deleteImage()}>
                <Badge variant="outline" className="cursor-pointer">
                  <PiTrashSimpleLight size="1.2rem" fontWeight={"1.2rem"} />
                </Badge>
              </AlertDialogConfirmation>
            </div>
          )}
          <DownloadButton className="ml-auto" url={image.secure_url} />
        </div>
      </div>
    </>
  );
}
