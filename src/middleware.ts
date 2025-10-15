import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  // Allow internal Next.js files, favicon, and static images
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/assets") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".svg")
  ) {
    return NextResponse.next();
  }

  // Pages allowed without token
  const publicPages = ["/Signup", "/login"];
  const isPublicPage = publicPages.some((page) => pathname.startsWith(page));

  // Allow API routes without token
  if (pathname.startsWith("/api")) return NextResponse.next();

  // ✅ If token exists → allow everything
  if (token) return NextResponse.next();

  // ✅ Allow only Signup and Login without token
  if (isPublicPage) return NextResponse.next();

  // ✅ If no token and trying to access any other page → redirect to Signup
  return NextResponse.redirect(new URL("/Signup", request.url));
}

// Apply middleware to all pages except _next, favicon, api
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
