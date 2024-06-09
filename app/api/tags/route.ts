import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export async function GET(request: NextRequest) {
  const { tags } = await cloudinary.api.tags();

  return Response.json({ tags });
}
