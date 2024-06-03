import { cookies } from "next/headers";
import { verifyTokenAction } from "./verify-token";

export default async function extractUserFromSession() {
  const cookieStore: any = cookies();

  const sessionCookie: any = cookieStore.get("Session");

  const sessionToken = sessionCookie.value;

  const session = await verifyTokenAction(sessionToken);

  return session;
}
