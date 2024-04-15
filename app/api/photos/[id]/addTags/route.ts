import { NextRequest } from "next/server";
import addTags from "../../../../../actions/add-tags.action";

export const dynamic = "force-dynamic";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const publicId = params.id;
  const { tags } = await request.json();

  await addTags(publicId, tags);

  return Response.json({ publicId, tags });
}
