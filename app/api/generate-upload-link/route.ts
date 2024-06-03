import generateTokenAction from "../../../actions/generate-token.action";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const baseUrl = (process.env.BASE_URL as string)
    ? "http://" + (process.env.BASE_URL as string)
    : "https://" + (process.env.VERCEL_URL as string);

  const token = await generateTokenAction({ role: "guest" }, "1w");
  const url: string = baseUrl + `/upload/${token}`;

  return Response.json({ url });
}
