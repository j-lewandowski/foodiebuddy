import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;
const publicRoutes = ["/", "/signin", "/signup"];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret });
  const isAuthenticated = !!token;

  if (!isAuthenticated && !publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (token && publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image).*)",
};
