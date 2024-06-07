"use client";
import { UploadIcon } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";
import { revalidateTagGallery } from "../actions/revalidateGallery.action";
import { Button, buttonVariants } from "./ui/button";
import { uploadButtonOptions } from "../lib/uploadButtonConfiguration";
import { cn } from "../lib/utils";
import { useToast } from "./ui/use-toast";
import { error } from "console";

export function UploadButtonShadcn() {
  const variant = "default";
  const size = "default";
  const className = "flex items-center gap-2";

  const { toast } = useToast();

  return (
    <CldUploadButton
      className={cn(buttonVariants({ variant, size, className }))}
      options={uploadButtonOptions}
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
      onSuccess={() => {
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
    >
      <UploadIcon size={16} />
      Publier
    </CldUploadButton>
  );
}
