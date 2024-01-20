"use client";
import { CldUploadButton } from "next-cloudinary";
import React from "react";

function UploadButton() {
  return (
    <CldUploadButton
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    />
  );
}

export default UploadButton;
