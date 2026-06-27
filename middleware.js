import { NextResponse } from "next/server";

/**
 * Gatekeeper for the whole app.
 *
 * Any request without a `closet_session` cookie is redirected to /login.
 * This is intentionally simple — there's no real user database behind it,
 * just a cookie that proves *someone* logged in. See README.md →
 * "Adding real authentication" before using this with real user data.
 */
export function middleware(request) {
  const session = request.cookies.get("closet_session");

  if (!session?.value) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Run on every route except the login page itself, the auth API routes
// (which must stay reachable while logged out), and static assets.
export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|login).*)"],
};
