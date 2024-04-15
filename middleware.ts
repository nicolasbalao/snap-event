import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("Session");

  if (!currentUser && request.nextUrl.pathname.startsWith("/upload/")) {
    return;
  }

  if (
    currentUser &&
    request.nextUrl.pathname.startsWith("/login/magic-link/generate")
  ) {
    return;
  }

  if (!currentUser && !request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(
      new URL("/login", request.nextUrl).toString(),
      302
    );
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
