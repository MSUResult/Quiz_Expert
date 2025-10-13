import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // If there's no token, handle the redirection or API error response
  if (!token) {
    // If the request is for an API route, return a 401 Unauthorized error
    if (pathname.startsWith("/api/")) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "Authentication failed: No token provided",
        }),
        { status: 401, headers: { "content-type": "application/json" } }
      );
    }

    // For any other route (i.e., a page), redirect to the Signup page
    return NextResponse.redirect(new URL("/Signup", request.url));
  }

  // If a token exists, allow the request to proceed
  return NextResponse.next();
}

// This config specifies on which routes the middleware will run
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (for public login/signup API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - /Signup (the public signup page)
     *
     * This means the middleware WILL RUN on:
     * - All other API routes (e.g., /api/me, /api/posts)
     * - All other pages (e.g., /, /dashboard, /profile)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|Signup).*)",
  ],
};
