"use server";

import * as jwt from "jsonwebtoken";

export default async function GenerateTokenAction(
  payload: object,
  expiresIn: number | string
) {
  return jwt.sign(payload, process.env.JWT_KEY as string, {
    expiresIn,
  });
}
