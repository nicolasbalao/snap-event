import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function extractCookieSession() {
  const cookieStore: any = cookies();

  const sessionCookie: any = cookieStore.get("Session");

  const sessionToken = sessionCookie.value;

  const session = jwt.decode(sessionToken);

  return session;
}
