import db from "@/utils/prisma";
import { getServerSession, Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/utils/authOptions";
import { supabase } from "@/utils/supabase";

export async function POST(request: NextRequest) {
  const restaurantData = await request.json();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.redirect(
      new URL("/sign-in", process.env.NEXT_PUBLIC_BASE_URL)
    );
  }

  const { userId } = session.user;

  const res = supabase.storage
    .from("foodiebuddy")
    .getPublicUrl(restaurantData.image);

  const imageUrl = res.data.publicUrl;

  // @TODO - default image in storage
  await db.restaurant.create({
    data: {
      rankingId: userId,
      name: restaurantData.name as string,
      image:
        imageUrl ||
        "https://rbyfmlbegrvfgrmnpogc.supabase.co/storage/v1/object/public/static-content/DefaultImage.png",
      rating: restaurantData.rating as number,
      recommendedFood: restaurantData.recommendedFood as string[],
    },
  });

  return NextResponse.json({}, { status: 201 });
}
