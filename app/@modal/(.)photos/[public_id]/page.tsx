"use client";
import { useRouter } from "next/navigation";
import CCldImage from "../../../../components/CCldImage";
import TagInput from "../../../../components/TagInput";
import { X } from "lucide-react";
import { useState } from "react";

export default function PhotoModal({ params }: { params: any }) {
  const { public_id } = params;

  const [isModified, setIsModified] = useState(false);

  const router = useRouter();

  const handleClosePopup = (e: any) => {
    if (e.target.classList.contains("overlay")) {
      closeWindow();
    }
  };

  const closeWindow = () => {
    router.back();
    if (isModified) {
      router.refresh();
    }
  };

  return (
    <>
      <div
        className="h-full w-full bg-black  bg-opacity-80 flex items-center justify-center fixed z-50 overlay"
        onClick={handleClosePopup}
      >
        <div className="flex flex-col justify-center items-center w-screen md:w-1/2">
          <div className="relative">
            <CCldImage
              src={public_id}
              alt="image"
              className="md:rounded"
              sizes="100vw"
              width={0}
              height={0}
              style={{ width: "100%", height: "auto", maxHeight: "80vh" }}
            />
            <div
              className="absolute top-1 right-2 text-white  rounded-full bg-black bg-opacity-10 p-1 cursor-pointer hover:bg-opacity-40"
              onClick={closeWindow}
            >
              <X size={16} />
            </div>
          </div>
          <TagInput public_id={public_id} />
        </div>
      </div>
    </>
  );
}
