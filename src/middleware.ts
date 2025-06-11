import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants";

export function middleware(request: NextRequest) {
  const onHosts = request.nextUrl.pathname.startsWith("/hosts");

  const authToken = request.cookies.get(ACCESS_TOKEN_KEY);
  const refreshToken = request.cookies.get(REFRESH_TOKEN_KEY);

  if (
    !Boolean(authToken) &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/signup") &&
    !request.nextUrl.pathname.startsWith("/hosts/signup") &&
    !request.nextUrl.pathname.startsWith("/account-created") &&
    !request.nextUrl.pathname.startsWith("/hosts/account-created")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    !!authToken &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/signup") &&
    !request.nextUrl.pathname.startsWith("/hosts/signup")
  ) {
    return NextResponse.next();
  }

  if (
    !!authToken &&
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/signup") ||
      request.nextUrl.pathname.startsWith("/hosts/signup"))
  ) {
    if (onHosts) {
      return NextResponse.redirect(
        new URL("/hosts/dashboard/properties", request.url)
      );
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/login",
    "/signup",
    "/dashboard/:path*",
    "/hosts/dashboard/:path*",
    "/hosts/signup",
    "/hosts/setup",
    "/account-created",
    "/hosts/account-created",
    "/hosts/checkout/:path*",
    "/checkout/:path*",
  ],
};
