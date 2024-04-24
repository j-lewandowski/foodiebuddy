import { NextRequest, NextResponse } from "next/server";
import isSimilarEnough from "./utlis/findSimilarity";

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

const getPlaces = async (lat: number, lng: number) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&rankby=distance&keyword=restaurant&key=${process.env.GOOGLE_PLACES_API_KEY}`
    );
    if (response.ok) {
      return await response.json();
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { googleLink } = body;

  const link = await unshortenUrl(googleLink);
  if (!link) {
    return NextResponse.json({});
  }

  // @TODO - link split refactor

  const deletedPrefixBeforePlace = link.slice(link.indexOf("place/") + 6);
  const objectName = deletedPrefixBeforePlace.slice(
    0,
    deletedPrefixBeforePlace.indexOf("/")
  );

  const deletedPrefix = link.slice(link.indexOf("@") + 1);
  const positionOfFirstSlash = link.slice(link.indexOf("@") + 1).indexOf("/");
  const locationString = deletedPrefix.slice(0, positionOfFirstSlash);
  const [lat, lng, zoom] = locationString.split(",");

  const placesResponse = await getPlaces(+lat, +lng);

  const restaurant = placesResponse.results.filter((place: any) =>
    isSimilarEnough(decodeURIComponent(objectName), place.name, 0.9)
  )[0];

  if (!restaurant) {
    return NextResponse.json({});
  }

  return NextResponse.json(restaurant);
}
