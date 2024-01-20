"use client";
import { CldUploadButton } from "next-cloudinary";

export default function UploadPage() {
  return (
    <main className="flex flex-col items-center justify-center gap-20 h-screen">
      <h1 className="text-5xl">Upload page</h1>
      <CldUploadButton
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      />
    </main>
  );
}
