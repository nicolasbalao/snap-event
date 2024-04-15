import { v2 as cloudinary } from "cloudinary";

export default async function addTags(publicId: string, tags: string[]) {
  if (tags.length === 0) {
    return;
  }
  if (!publicId) {
    throw new Error("publicId is required");
  }

  const { resources } = await cloudinary.api.update(publicId, {
    tags: tags,
  });

  return resources;
}
