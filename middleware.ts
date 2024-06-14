import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import db from "./utils/prisma";

const secret = process.env.NEXTAUTH_SECRET;
const publicRoutes = ["/", "/signin", "/signup", "/faq"];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret });
  const isAuthenticated = !!token;

  if (!isAuthenticated && !publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (isAuthenticated && publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/map", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|images|_next/image).*)",
};
