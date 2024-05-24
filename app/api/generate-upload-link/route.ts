import jwt from "jsonwebtoken";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const baseUrl = (process.env.BASE_URL as string)
    ? "http://" + (process.env.BASE_URL as string)
    : "https://" + (process.env.VERCEL_URL as string);

  const token = jwt.sign({ foo: "bar" }, process.env.JWT_KEY as string, {
    expiresIn: "1w",
  });
  const url: string = baseUrl + `/upload/${token}`;

  return Response.json({ url });
}
