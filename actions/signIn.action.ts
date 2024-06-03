"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import generateTokenAction from "./generate-token.action";

export default async function SignInAction(
  currentState: any,
  formData: FormData
) {
  // 1. Extract password from formData

  const password: string = formData.get("password") as string;

  if (!password) {
    return "Password is required";
  }

  const correctPassword = process.env.PASSWORD;

  // 2. Check if password is correct
  const isPasswordCorrect = password === correctPassword;

  if (!isPasswordCorrect) {
    return "Password is incorrect";
  }

  // 3. If password is correct set cookie with admin privs
  const sessionToken: string = await generateTokenAction(
    { role: "admin" },
    "1w"
  );
  cookies().set("Session", sessionToken, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 1 week,
    path: "/",
  });
  // 5. Return to the main page

  redirect("/");
}
