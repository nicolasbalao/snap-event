import { v2 as cloudinary } from "cloudinary";

export default async function addTags(publicId: string, tags: string[]) {
  if (tags.length === 0) {
    return;
  }
  if (!publicId) {
    throw new Error("publicId is required");
  }

  const normalizedTags = tags.map((tag) => tag.trim().toLowerCase());

  const { resources } = await cloudinary.api.update(publicId, {
    tags: normalizedTags,
  });

  return resources;
}
