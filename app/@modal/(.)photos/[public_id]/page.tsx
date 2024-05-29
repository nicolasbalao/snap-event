"use client";
import { useRouter } from "next/navigation";
import CCldImage from "../../../../components/CCldImage";
import TagInput from "../../../../components/TagInput";

export default function PhotoModal({ params }: { params: any }) {
  const { public_id } = params;

  const router = useRouter();

  const handleClosePopup = (e: any) => {
    if (e.target.classList.contains("overlay")) {
      router.back();
      router.refresh();
    }
  };

  return (
    <>
      <div
        className="h-full w-full bg-black  bg-opacity-80 flex items-center justify-center fixed z-50 overlay"
        onClick={handleClosePopup}
      >
        <div className="flex flex-col justify-center items-center">
          <div>
            <CCldImage
              src={public_id}
              alt="image"
              className="md:rounded"
              width={500}
              height={500}
            />
          </div>
          <TagInput public_id={public_id} />
        </div>
      </div>
    </>
  );
}
