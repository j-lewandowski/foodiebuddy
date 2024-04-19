import { NextRequest, NextResponse } from "next/server";

const unshortenUrl = async (shortUrl: string) => {
  try {
    const response = await fetch(shortUrl, {
      method: "HEAD",
      redirect: "follow",
    });
    if (response.ok) {
      return response.url;
    } else {
      console.error("Odpowiedź z błędem:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Wystąpił błąd:", error);
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

  const deletedPrefix = link.slice(link.indexOf("@") + 1);
  const positionOfFirstSlash = link.slice(link.indexOf("@") + 1).indexOf("/");
  const locationString = deletedPrefix.slice(0, positionOfFirstSlash);
  const [lat, lng, zoom] = locationString.split(",");

  const placesResponse = await getPlaces(+lat, +lng);
  const restaurant = placesResponse.results[0];

  if (!restaurant) {
    return NextResponse.json({});
  }

  return NextResponse.json(restaurant);
}
