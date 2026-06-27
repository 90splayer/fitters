import { NextResponse } from "next/server";

/**
 * POST /api/auth/login
 *
 * MOCK AUTH — there is no user database yet. This accepts any
 * syntactically valid email plus a password of at least 6 characters,
 * and treats that as a successful login. Every "account" is really the
 * same implicit user; the email is only kept around to show in the nav.
 *
 * See README.md → "Adding real authentication" for how to replace this
 * with Supabase/Firebase Auth (as recommended in the PRD) without
 * changing how the rest of the app reads the session.
 */
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { email, password } = body;

  const validEmail = typeof email === "string" && /\S+@\S+\.\S+/.test(email);
  const validPassword = typeof password === "string" && password.length >= 6;

  if (!validEmail || !validPassword) {
    return NextResponse.json(
      { error: "Enter a valid email and a password of at least 6 characters." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true, email });

  response.cookies.set("closet_session", email, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
