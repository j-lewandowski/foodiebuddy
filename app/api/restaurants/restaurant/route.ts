import { db } from "@/utlis/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const restaurantId = req.nextUrl.searchParams.get("id");
  if (!restaurantId) {
    return NextResponse.json([]);
  }
  const restaurant = await db.restaurant.findUnique({
    where: { id: restaurantId },
  });
  return NextResponse.json(restaurant);
}

export async function DELETE(req: NextRequest) {
  const restaurantId = req.nextUrl.searchParams.get("id");

  if (!restaurantId) return NextResponse.json({});
  await db.restaurant.delete({
    where: {
      id: restaurantId,
    },
  });

  return NextResponse.redirect(new URL("/tiers", req.url));
}
