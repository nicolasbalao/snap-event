"use client";
import { useRouter } from "next/navigation";
import CCldImage from "../../../../components/CCldImage";

export default function PhotoModal({ params }: { params: any }) {
  const { public_id } = params;
  const router = useRouter();

  const handleClosePopup = (e: any) => {
    if (e.target.classList.contains("overlay")) {
      router.back();
    }
  };

  return (
    <>
      <div
        className="h-full w-full bg-black  bg-opacity-70 flex items-center justify-center absolute overlay"
        onClick={handleClosePopup}
      >
        <div className="p-4">
          <CCldImage
            src={public_id}
            alt="image"
            width={500}
            height={500}
            size="90vw"
            className="rounded"
          />
        </div>
      </div>
    </>
  );
}
