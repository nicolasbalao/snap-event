"use client";
import { useEffect, useState } from "react";
import { imageData } from "../app/page";
import ImageCard from "./ImageCard";
import InfiniteScroll from "react-infinite-scroll-component";

type GalleryProps = {
  searchTag: string | undefined;
  isAdmin: boolean;
};

export default function Gallery(props: GalleryProps) {
  const { searchTag, isAdmin } = props;
  const [resources, setResources] = useState<imageData[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  const fetchPhotos = async (reset: boolean) => {
    let url = `/api/photos${
      nextCursor && !reset ? `?cursor=${nextCursor}` : ""
    }`;

    if (searchTag) {
      if (url.includes("?")) {
        url += `&tags=${searchTag}`;
      } else {
        url += `?tags=${searchTag}`;
      }
    }

    const res = await fetch(url, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (!reset) {
        setResources((prev) => [...prev, ...data.resources]);
      } else {
        setResources(data.resources);
      }
      setNextCursor(data.next_cursor);
    }
  };
  useEffect(() => {
    fetchPhotos(true);
  }, [searchTag]);
  return (
    <InfiniteScroll
      dataLength={resources.length}
      next={() => fetchPhotos(false)}
      hasMore={!!nextCursor}
      loader="Is loading"
      className="flex flex-col  items-center w-full md:grid grid-cols-4 gap-6 md:p-4"
    >
      {resources &&
        resources.map((image: imageData) => (
          <ImageCard
            image={image}
            isAdmin={isAdmin}
            width={image.width}
            height={image.height}
            key={image.public_id}
          />
        ))}
    </InfiniteScroll>
  );
}
