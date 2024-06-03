"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IconContext } from "react-icons";
import "tailwindcss/tailwind.css";

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
        <Badge variant="outline">
          {isFavorited ? (
            <IconContext.Provider value={{ color: "red" }}>
              <FaHeart className="animate-fadeIn" size="1.2rem" />
            </IconContext.Provider>
          ) : (
            <FaRegHeart className="animate-fadeIn" size="1.2rem" />
          )}
        </Badge>
      </button>
    </form>
  );
}
