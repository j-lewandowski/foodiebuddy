import { db } from "@/utlis/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  const user = await db.user.findUnique({ where: { email: res.email } });

  if (!user) {
    try {
      await db.user.create({
        data: {
          email: res.email,
          name: res.name,
        },
      });
      return NextResponse.json({ status: 201 });
    } catch (error) {
      console.log("yy");
      return NextResponse.json({ status: 400 });
    }
  }

  return NextResponse.json({ status: 200 });
}
