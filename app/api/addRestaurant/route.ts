import cloudinary from "@/utlis/cloudinary";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { db } from "@/utlis/db";

const uploadFile = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  return await new Promise((resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream({}, function (error, result) {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      })
      .end(buffer);
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

  const restaurantData = {
    name: data.get("name") as string,
    rating: parseInt(data.get("rating") as string),
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
    return NextResponse.json(
      { error: "Coś poszło nie tak :c" },
      { status: 500 }
    );
  }
}
