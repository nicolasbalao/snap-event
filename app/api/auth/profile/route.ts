import extractUserFromSession from "../../../../actions/extract-cookie-session.action";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const userInformation = await extractUserFromSession();

  return Response.json(userInformation);
}
