import { NextRequest } from "next/server";
import extractUserFromSession from "../../../../actions/extract-cookie-session.action";
import { v2 as cloudinary } from "cloudinary";
import { revalidateTag } from "next/cache";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user: any = await extractUserFromSession();
  const isAdmin = user?.role === "admin";

  if (!isAdmin) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const publicId = params.id;

  const { result }: { result: string } = await cloudinary.uploader.destroy(
    publicId
  );

  revalidateTag("gallery");

  return Response.json({ result });
}
