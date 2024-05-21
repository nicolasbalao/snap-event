import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import addTags from "../../../../../actions/add-tags.action";
import { revalidateTag } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const publicId = params.id;

  const image = await cloudinary.api.resource(publicId);

  if (!image) {
    return Response.json({ message: "Image not found" }, { status: 404 });
  }

  return Response.json({ tags: image.tags });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const publicId = params.id;
  const { tags } = await request.json();

  await addTags(publicId, tags);

  revalidateTag("tags");

  return Response.json({ publicId, tags });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const publicId = params.id;
  const { tag } = await request.json();

  await cloudinary.uploader.remove_tag(tag, [publicId]);

  revalidateTag("tags");

  return Response.json({ publicId, tag });
}
