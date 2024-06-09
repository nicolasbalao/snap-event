"use client";
import TagInput from "./TagInput";
import CCldImage from "./CCldImage";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

type PhotoDetailsProps = {
  public_id: string;
  isModal?: boolean;
};

export default function PhotoDetails(props: PhotoDetailsProps) {
  const { public_id, isModal } = props;

  const [isModified, setIsModified] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  const router = useRouter();

  const closeWindow = () => {
    router.back();
    if (isModified) {
      router.refresh();
    }
  };

  const fetchUser = () => {
    fetch("/api/auth/profile", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.role === "admin") {
          setIsAdmin(true);
        }
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-screen md:w-1/2">
      <div className="relative">
        <CCldImage
          src={public_id}
          alt="image"
          className="md:rounded"
          sizes="100vw"
          width={0}
          height={0}
          style={{ width: "100%", height: "auto", maxHeight: "60vh" }}
        />
        {isModal && (
          <div
            className="absolute top-1 right-2 text-white  rounded-full bg-black bg-opacity-10 p-1 cursor-pointer hover:bg-opacity-40"
            onClick={closeWindow}
          >
            <X size={16} />
          </div>
        )}
      </div>
      {isAdmin && (
        <TagInput public_id={public_id} setIsModified={setIsModified} />
      )}
    </div>
  );
}
