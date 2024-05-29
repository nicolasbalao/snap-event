"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Tags, X } from "lucide-react";
import { Badge } from "./ui/badge";

type TagInputProps = {
  public_id: string;
};

export default function TagInput(props: TagInputProps) {
  const { public_id } = props;

  const [existingTags, setExistingTags] = useState<string[]>([]);
  const [newTags, setNewTags] = useState<string[]>([]);

  const getTags = () => {
    fetch(`/api/photos/${public_id}/tags`)
      .then((res) => res.json())
      .then((data) => {
        if (data.tags && data.tags.length > 0) {
          setExistingTags(data.tags);
        }
      });
  };

  const addTagsRequest = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/photos/${public_id}/tags`, {
        method: "PUT",
        body: JSON.stringify({ tags: [...newTags, ...existingTags] }),
        headers: {
          "content-type": "application/json",
        },
      });

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

  useEffect(() => {
    getTags();
  }, []);

  return (
    <>
      <div className="bg-white w-full p-2  mt-5 flex flex-col gap-6 sm:gap-4 md:rounded">
        <div className="flex items-center gap-2">
          <Tags />
          <h2 className="text-base font-normal md:text-xl md:font-semibold">
            Tags
          </h2>
        </div>
        {existingTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {existingTags.map((tag, index) => (
              <Badge
                key={tag + index}
                className="flex items-center space-x-1.5"
              >
                <span>{tag}</span>
                <X size={16} onClick={() => deleteTag(tag)} />
              </Badge>
            ))}
          </div>
        )}
        <form
          method="post"
          onSubmit={addTagsRequest}
          className="flex items-center gap-2"
        >
          <Input
            name="tags"
            type="text"
            value={newTags}
            onChange={(e: any) => {
              setNewTags(e.target.value.split(","));
            }}
          />
          <Button size="sm" type="submit">
            Ajouter
          </Button>
        </form>
      </div>
    </>
  );
}
