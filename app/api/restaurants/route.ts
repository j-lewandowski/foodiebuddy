import db from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/utils/authOptions";
import { supabase } from "@/utils/supabase";

// @TODO - prepare another storage for different environments

export async function GET(request: NextRequest) {
  const rankingId = request.nextUrl.searchParams.get("rankingId");

  if (!rankingId) return NextResponse.json({});

  try {
    const restaurants = await db.restaurant.findMany({
      where: {
        rankingId: +rankingId,
      },
      orderBy: {
        rating: "desc",
      },
    });

    return NextResponse.json(restaurants);
  } catch (error) {
    return NextResponse.json({});
  }
}

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
      location: restaurantData.location as string,
    },
  });

  return NextResponse.json({}, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const restaurantId = request.nextUrl.searchParams.get("restaurantId");
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.redirect(
      new URL("/sign-in", process.env.NEXT_PUBLIC_BASE_URL)
    );
  }

  if (!restaurantId) return NextResponse.json({}, { status: 400 });
  const restaurant = await db.restaurant.findFirst({
    where: { id: +restaurantId },
  });

  const imageName = restaurant?.image.split("/").pop();

  if (imageName !== "DefaultImage.png") {
    try {
      await supabase.storage
        .from("foodiebuddy-images")
        .remove([`${restaurant?.rankingId}/${imageName}`]);
    } catch (error) {
      console.log(error);
    }
  }

  await db.restaurant.delete({ where: { id: +restaurantId } });

  return NextResponse.json({}, { status: 200 });
}

export async function PUT(request: NextRequest) {
  const restaurantData = await request.json();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.redirect(
      new URL("/sign-in", process.env.NEXT_PUBLIC_BASE_URL)
    );
  }

  const { userId } = session.user;

  if (!restaurantData.id) return NextResponse.json({}, { status: 400 });
  const restaurant = await db.restaurant.findFirst({
    where: { id: +restaurantData.id },
  });

  const imageName = restaurant?.image.split("/").pop();

  if (imageName !== "DefaultImage.png") {
    try {
      await supabase.storage
        .from("foodiebuddy-images")
        .remove([`${restaurant?.rankingId}/${imageName}`]);
    } catch (error) {
      console.log(error);
    }
  }

  const res = supabase.storage
    .from("foodiebuddy-images")
    .getPublicUrl(restaurantData.image);

  const { publicUrl } = res.data;

  // @TODO better default image handling

  await db.restaurant.update({
    where: { id: restaurantData.id },
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
      location: restaurantData.location as string,
    },
  });

  return NextResponse.json({}, { status: 201 });
}
