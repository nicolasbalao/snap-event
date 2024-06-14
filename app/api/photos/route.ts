import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { parse } from "url";

export async function GET(request: NextRequest) {
  const { query } = parse(request.url, true);
  let { tags, cursor } = query;

  let expression: string = "resource_type:image";
  if (tags) {
    expression = `${expression} AND tags=${tags}`;
  }

  if (cursor !== "null") {
    const { resources, next_cursor } = await cloudinary.search
      .expression(expression)
      .with_field("tags")
      .sort_by("created_at", "desc")
      .max_results(12)
      .next_cursor(cursor as string | undefined)
      .execute();

    return Response.json({ resources, next_cursor });
  } else {
    const { resources, next_cursor } = await cloudinary.search
      .expression(expression)
      .with_field("tags")
      .sort_by("created_at", "desc")
      .max_results(12)
      .execute();

    return Response.json({ resources, next_cursor });
  }
}
