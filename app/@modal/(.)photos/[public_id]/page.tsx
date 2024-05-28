"use client";
import { useRouter } from "next/navigation";
import CCldImage from "../../../../components/CCldImage";
import { useEffect, useState } from "react";
import TagInput from "../../../../components/TagInput";

export default function PhotoModal({ params }: { params: any }) {
  const { public_id } = params;
  // const [existingTags, setExistingTags] = useState<string[]>([]);
  // const [newTags, setNewTags] = useState<string[]>([]);

  const router = useRouter();

  const handleClosePopup = (e: any) => {
    if (e.target.classList.contains("overlay")) {
      router.back();
    }
  };

  // const addTagsRequest = async (e: any) => {
  //   e.preventDefault();

  //   try {
  //     const res = await fetch(`/api/photos/${public_id}/tags`, {
  //       method: "PUT",
  //       body: JSON.stringify({ tags: [...newTags, ...existingTags] }),
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //     });

  //     if (res.ok) {
  //       const data = await res.json();
  //       const { tags } = data;
  //       setExistingTags(tags);
  //       setNewTags([]);
  //       router.refresh();
  //     } else {
  //       console.error(res.statusText);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // useEffect(() => {
  //   fetch(`/api/photos/${public_id}/tags`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.tags && data.tags.length > 0) {
  //         setExistingTags(data.tags);
  //       }
  //     });
  // }, []);

  // function deleteTag(tag: string): void {
  //   try {
  //     fetch(`/api/photos/${public_id}/tags`, {
  //       method: "DELETE",
  //       body: JSON.stringify({ tag }),
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //     }).then((res) => {
  //       if (res.ok) {
  //         setExistingTags(existingTags.filter((t) => t !== tag));
  //         router.refresh();
  //       } else {
  //         console.error(res.statusText);
  //       }
  //     });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

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
