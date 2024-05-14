import { NextRequest, NextResponse } from "next/server";
import isSimilarEnough from "./utlis/findSimilarity";
import getPlaces from "../utils/getPlaces";
import { split } from "postcss/lib/list";
import decodeQueryParam from "./utlis/decodeQueryParam";

const unshortenUrl = async (shortUrl: string) => {
  try {
    const response = await fetch(shortUrl, {
      method: "HEAD",
      redirect: "follow",
    });
    if (response.ok) {
      return response.url;
    } else {
      console.error("Response with error:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { googleLink } = body;

  const link = await unshortenUrl(googleLink);
  if (!link) {
    return NextResponse.json({});
  }

  // @TODO - find a better way to return only one desired restaurant (?)
  const splittedLink = link.split("/");

  const objectName = decodeQueryParam(splittedLink[5]);

  const [lat, lng, zoom] = splittedLink[6].slice(1).split(",");

  const placesResponse = await getPlaces(+lat, +lng);

  const restaurant = placesResponse.results.filter((place: any) =>
    isSimilarEnough(objectName, place.name, 0.85)
  )[0];

  if (!restaurant) {
    return NextResponse.json({}, { status: 400 });
  }

  return NextResponse.json(restaurant);
}
