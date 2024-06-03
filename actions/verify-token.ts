"use server";

import { jwtVerify } from "jose";

export async function verifyTokenAction(token: any): Promise<object | null> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_KEY as string);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (e) {
    console.error("JWT verification failed: ", e);
    return null;
  }
}
