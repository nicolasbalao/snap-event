"use client";
import { CldUploadButton } from "next-cloudinary";
import React from "react";
import { revalidateTagGallery } from "../actions/revalidateGallery.action";
import { Upload as UploadIcon } from "lucide-react";

function UploadButton() {
  return (
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
  );
}

export default UploadButton;
