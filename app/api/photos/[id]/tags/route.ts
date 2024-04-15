import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const publicId = params.id;
  const { tag } = await request.json();

  await cloudinary.uploader.remove_tag(tag, [publicId]);

  return Response.json({ publicId, tag });
}
