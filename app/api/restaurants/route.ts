import cloudinary from "@/utlis/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/utlis/db";
import { RATINGS } from "@/constants";

const uploadFile = async (file: File) => {
  const fileBuffer = await file.arrayBuffer();

  const mime = file.type;
  const encoding = "base64";
  const base64Data = Buffer.from(fileBuffer).toString("base64");
  const fileUri = "data:" + mime + ";" + encoding + "," + base64Data;
  return new Promise((resolve, reject) => {
    const result = cloudinary.v2.uploader
      .upload(fileUri, {
        invalidate: true,
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

interface FilePath {
  url: string;
}

const FormData = z.object({
  name: z.string().min(1).max(20),
  rating: z.number().gte(0).lte(6),
});

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const jsonData = JSON.parse(data.get("data") as string);

  const restaurantData = {
    ...jsonData,
  };

  if (!FormData.safeParse(restaurantData).success) {
    return NextResponse.json({ error: "Niepoprawne dane" }, { status: 400 });
  }

  try {
    const filePath = (await uploadFile(data.get("image") as File)) as FilePath;
    const imageUrl = filePath.url;

    await db.restaurant.create({
      data: {
        ...restaurantData,
        image: imageUrl,
      },
    });

    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Coś poszło nie tak :c" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const tier = req.nextUrl.searchParams.get("tier");
  const value = RATINGS.filter((rating) => rating.tier === tier)[0].value;
  if (!tier) {
    return NextResponse.json([]);
  }

  const restaurants = await db.restaurant.findMany({
    where: {
      rating: RATINGS[value].value,
    },
  });

  return NextResponse.json(restaurants);
}
