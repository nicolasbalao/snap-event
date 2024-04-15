"use server";

import { cookies } from "next/headers";

export default async function setCookieAction(
  token: string,
  maxAge = 60 * 60 * 24 * 7
) {
  cookies().set("Session", token, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge,
    path: "/",
  });
}
