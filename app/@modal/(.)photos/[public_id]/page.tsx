"use client";
import { useRouter } from "next/navigation";
import CCldImage from "../../../../components/CCldImage";
import { useEffect, useState } from "react";

export default function PhotoModal({ params }: { params: any }) {
  const { public_id } = params;
  const [existingTags, setExistingTags] = useState<string[]>([]);
  const [newTags, setNewTags] = useState<string[]>([]);

  const router = useRouter();

  const handleClosePopup = (e: any) => {
    if (e.target.classList.contains("overlay")) {
      router.back();
    }
  };

  const addTagsRequest = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/photos/${public_id}/addTags`, {
        method: "PUT",
        body: JSON.stringify({ tags: [...newTags, ...existingTags] }),
        headers: {
          "content-type": "application/json",
        },
      });

      console.log(res);
      if (res.ok) {
        const data = await res.json();
        const { tags } = data;
        setExistingTags(tags);
        setNewTags([]);
      } else {
        console.error(res.statusText);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetch(`/api/photos/${public_id}/tags`)
      .then((res) => res.json())
      .then((data) => {
        if (data.tags && data.tags.length > 0) {
          setExistingTags(data.tags);
        }
      });
  }, []);

  function deleteTag(tag: string): void {
    try {
      fetch(`/api/photos/${public_id}/tags`, {
        method: "DELETE",
        body: JSON.stringify({ tag }),
        headers: {
          "content-type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          setExistingTags(existingTags.filter((t) => t !== tag));
        } else {
          console.error(res.statusText);
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <div
        className="h-full w-full bg-black  bg-opacity-70 flex items-center justify-center absolute overlay"
        onClick={handleClosePopup}
      >
        <div>
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
          <div>
            <form method="post" onSubmit={addTagsRequest}>
              <input
                name="tags"
                type="text"
                value={newTags}
                onChange={(e: any) => {
                  setNewTags(e.target.value.split(","));
                }}
              />
              <button type="submit">add</button>
            </form>
          </div>
          <div>
            {existingTags.length > 0 && (
              <div>
                {existingTags.map((tag, index) => (
                  <div>
                    <span key={tag + index}>{tag}, </span>
                    <button onClick={() => deleteTag(tag)}>X</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
