"use client";
import { CldUploadButton } from "next-cloudinary";
import { revalidateTagGallery } from "../actions/revalidateGallery.action";
import { UploadIcon } from "lucide-react";
import { uploadButtonOptions } from "../lib/uploadButtonConfiguration";
import { useToast } from "./ui/use-toast";

function UploadButton() {
  const { toast } = useToast();

  return (
    <div className="flex items-center gap-2">
      <UploadIcon size={16} />
      <CldUploadButton
        className="w-full"
        options={uploadButtonOptions}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
        onSuccess={() => {
          // TODO: Find better solution for handle the reload
          toast({
            title: "Image publiée avec succès",
            description: "Votre image a été publiée avec succès",
          });
          setTimeout(() => {
            revalidateTagGallery();
          }, 2000);
        }}
        onError={(error) => {
          console.error("Error uploading image", error);
          toast({
            title: "Erreur",
            description:
              "Une erreur est survenue lors de la publication de l'image",
            variant: "destructive",
          });
        }}
      />
    </div>
  );
}

export default UploadButton;
