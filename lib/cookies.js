// Minimal client-side cookie reader. The session cookie is intentionally
// not httpOnly (see app/api/auth/login/route.js) so the UI can show which
// "account" is logged in without an extra round trip. If you move to real
// auth, you'll likely want a proper session token here instead — at that
// point, fetch the current user from an API route instead of reading the
// cookie directly.
export function getCookie(name) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
}
