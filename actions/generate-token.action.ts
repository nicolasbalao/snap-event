"use server";

import * as jwt from "jsonwebtoken";

export default async function generateTokenAction(
  payload: object,
  expiresIn: number | string
): Promise<string> {
  return jwt.sign(payload, process.env.JWT_KEY as string, {
    expiresIn,
  });
}
