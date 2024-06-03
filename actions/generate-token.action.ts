"use server";

import { SignJWT } from "jose";

export default async function generateTokenAction(
  payload: any,
  expiresIn: number | string
): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_KEY as string);

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
}
