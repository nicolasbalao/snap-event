import { randomUUID } from "crypto";
import generateTokenAction from "../../../../actions/generate-token.action";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const token: string = await generateTokenAction(
    { uiid: randomUUID(), role: "guest" },
    "60d"
  );

  const baseUrl = (process.env.BASE_URL as string)
    ? "http://" + (process.env.BASE_URL as string)
    : "https://" + (process.env.VERCEL_PROJECT_PRODUCTION_URL as string);

  const magicLink: string = baseUrl + `/login/magic-link/${token}`;

  return Response.json({ magicLink });
}
