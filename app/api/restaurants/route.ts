import db from "@/utils/prisma";
import { getServerSession, Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/utils/authOptions";

export async function POST(request: NextRequest) {
  const restaurantData = await request.json();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.redirect(
      new URL("/sign-in", process.env.NEXT_PUBLIC_BASE_URL)
    );
  }

  const { userId } = session.user;

  await db.restaurant.create({
    data: {
      rankingId: userId,
      name: restaurantData.name as string,
      image:
        (restaurantData.image as string) ||
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fillustrations%2Frestaurant-icon&psig=AOvVaw37PdslzA8qLQ0oO8WAtrJh&ust=1713451613806000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKCJx-m-yYUDFQAAAAAdAAAAABAE",
      rating: restaurantData.rating as number,
      recommendedFood: restaurantData.recommendedFood as string[],
    },
  });

  return NextResponse.json({});
}
