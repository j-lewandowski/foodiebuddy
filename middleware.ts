import { getSession } from "next-auth/react";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // const session = await getSession();
  // console.log(session);
  // const userToken = request.cookies.token;
  // console.log(userToken);
}

export const config = {
  matcher: ["/"], // public routes
};
