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

  // Public pages
  const publicPages = ["/Signup", "/login", "/"];
  const isPublicPage = publicPages.some((page) => pathname.startsWith(page));

  // ✅ If token exists → allow everything
  if (token) return NextResponse.next();

  // ✅ Allow public pages without token
  if (isPublicPage) return NextResponse.next();

  // ✅ For all other pages (not APIs), redirect to Signup
  if (!pathname.startsWith("/api/")) {
    return NextResponse.redirect(new URL("/Signup", request.url));
  }

  // ✅ Allow API routes to work freely (do nothing)
  return NextResponse.next();
}

// Apply middleware to all pages except _next, favicon, api/auth
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
