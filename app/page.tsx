"use client";
import { CldImage, CldUploadButton } from "next-cloudinary";

export default function Home() {
  return (
    <main>
      <CldImage
        width={900}
        height={900}
        src="https://res.cloudinary.com/ddomuvkaw/image/upload/v1704475945/cld-sample-5.jpg"
        alt="Cloudinary Sample Image"
      />

      <CldUploadButton
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
      />
    </main>
  );
}
