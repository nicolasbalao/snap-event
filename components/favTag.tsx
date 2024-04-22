"use client";

import { useState } from "react";
import HeartIcon from "./HeartIcon";
import { useRouter } from "next/navigation";

type FavTagProps = {
  publicId: string;
  isFav: boolean;
};

export default function FavTag(props: FavTagProps) {
  const { publicId, isFav } = props;

  const router = useRouter();

  const [isFavorited, setIsFavorited] = useState(isFav);

  const toggleFavorite = async (e: any) => {
    // Send a request to the server to update the favorite status
    if (!isFavorited) {
      const res = await fetch(`/api/photos/${publicId}/tags`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tags: ["favoris"],
        }),
      });

      if (res.ok) {
        setIsFavorited(true);
        router.refresh();
      }
    } else {
      const res = await fetch(`/api/photos/${publicId}/tags`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tag: "favoris",
        }),
      });

      if (res.ok) {
        setIsFavorited(false);
        router.refresh();
      }
    }
  };

  return (
    <form action={toggleFavorite}>
      <button type="submit">
        <HeartIcon isFilled={isFavorited} />
      </button>
    </form>
  );
}
