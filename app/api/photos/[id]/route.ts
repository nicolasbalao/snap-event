import { v2 as cloudinary } from "cloudinary";
import { NextRequest } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const publicId = params.id;
  const { tag } = await request.json();
  const test = await cloudinary.uploader.remove_tag(publicId, tag);

  return Response.json({ publicId, tag, test });
}
