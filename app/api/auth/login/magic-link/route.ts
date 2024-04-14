import * as jwt from "jsonwebtoken";
import setCookieAction from "../../../../../actions/generate-auth-cookie.action";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json();
  const { token } = body;

  try {
    const isValid = jwt.verify(token, process.env.JWT_KEY as string)
      ? true
      : false;

    if (!isValid) {
      return Response.json({ error: "Invalid token" }, { status: 401 });
    }
  } catch (e) {
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }

  await setCookieAction(token);

  return Response.json({ success: true });
}
