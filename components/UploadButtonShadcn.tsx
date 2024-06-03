"use client";
import { UploadIcon } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";
import { revalidateTagGallery } from "../actions/revalidateGallery.action";
import { Button } from "./ui/button";

export function UploadButtonShadcn() {
  return (
    <Button>
      <div className="flex items-center gap-2">
        <UploadIcon size={16} />
        <CldUploadButton
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
          onSuccess={() => {
            // TODO: Find better solution for handle the reload
            setTimeout(() => {
              revalidateTagGallery();
            }, 2000);
          }}
        />
      </div>
    </Button>
  );
}
