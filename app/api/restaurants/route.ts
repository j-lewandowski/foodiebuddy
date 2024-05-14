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
    .from("foodiebuddy-images")
    .getPublicUrl(restaurantData.image);

  const { publicUrl } = res.data;

  // @TODO better default image handling
  await db.restaurant.create({
    data: {
      rankingId: userId,
      name: restaurantData.name as string,
      image: restaurantData.image
        ? publicUrl
        : "https://rbyfmlbegrvfgrmnpogc.supabase.co/storage/v1/object/public/static-content/DefaultImage.png",
      rating: restaurantData.rating as number,
      recommendedFood: restaurantData.recommendedFood as string[],
      lat: restaurantData.lat as number,
      lng: restaurantData.lng as number,
    },
  });

  return NextResponse.json({}, { status: 201 });
}
