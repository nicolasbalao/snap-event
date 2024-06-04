"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PhotoDetails from "../../../../components/PhotoDetail";

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
        <PhotoDetails public_id={public_id} isModal />
      </div>
    </>
  );
}
