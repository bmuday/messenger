import { NextResponse } from "next/server";

export function middleware(request) {
  for (const pair of request.headers.entries()) {
    if (pair[0] === "cookie" && pair[1].includes("directus_refresh_token"))
      return;
  }
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|sign-up).*)"],
};
