"use client";
import { UploadIcon } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";
import { revalidateTagGallery } from "../actions/revalidateGallery.action";
import { Button, buttonVariants } from "./ui/button";
import { uploadButtonOptions } from "../lib/uploadButtonConfiguration";
import { cn } from "../lib/utils";

export function UploadButtonShadcn() {
  const variant = "default";
  const size = "default";
  const className = "flex items-center gap-2";

  return (
    // <div className="flex items-center gap-2">
    <CldUploadButton
      className={cn(buttonVariants({ variant, size, className }))}
      options={uploadButtonOptions}
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
      onSuccess={() => {
        // TODO: Find better solution for handle the reload
        setTimeout(() => {
          revalidateTagGallery();
        }, 2000);
      }}
    >
      <UploadIcon size={16} />
      Publier
    </CldUploadButton>
  );
}
