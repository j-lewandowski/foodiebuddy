import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;
const publicRoutes = ["/"];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret });

  if (!token && !publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  if (token && publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/tiers", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|Logo.svg).*)"],
};
