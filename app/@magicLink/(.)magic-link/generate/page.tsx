"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MagicLinkPopup() {
  const [isCopied, setIsCopied] = useState(false);

  const magicLink =
    "http://localhost:3000/upload/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIifQ.1J3";

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(magicLink);
    setIsCopied(true);
  };

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
        <div className="flex gap-3 p-9 bg-white rounded-sm">
          <input type="text" value={magicLink} />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleCopyToClipboard}
          >
            {isCopied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </>
  );
}
