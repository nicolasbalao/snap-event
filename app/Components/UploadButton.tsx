"use client";
import { CldUploadButton } from "next-cloudinary";
import React from "react";
import { useRouter } from "next/navigation";

function UploadButton() {
  const router = useRouter();
  return (
    <CldUploadButton
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onSuccess={() => {
        // TODO: Find better solution for handle the reload
        setTimeout(() => {
          router.refresh();
        }, 2000);
      }}
    />
  );
}

export default UploadButton;
