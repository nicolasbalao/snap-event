import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { parse } from "url";

export async function GET(request: NextRequest) {
  const { query } = parse(request.url, true);
  console.log("Query", query);
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

// import { NextRequest, NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";
// import { parse } from "url";

// export async function GET(request: NextRequest) {
//   const { query } = parse(request.url, true);
//   const { tags, cursor } = query;

//   let expression = "resource_type:image";
//   if (tags) {
//     expression += ` AND tags=${tags}`;
//   }

//   const searchQuery = cloudinary.search
//     .expression(expression)
//     .with_field("tags")
//     .sort_by("created_at", "desc")
//     .max_results(11);

//   if (cursor && cursor !== "null") {
//     searchQuery.next_cursor(cursor as string);
//   }

//   const { resources, next_cursor } = await searchQuery.execute();
//   return NextResponse.json({ resources, next_cursor });
// }
