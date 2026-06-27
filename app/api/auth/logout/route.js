import { NextResponse } from "next/server";

// POST /api/auth/logout — clears the session cookie
export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set("closet_session", "", {
    path: "/",
    maxAge: 0,
  });

  return response;
}
