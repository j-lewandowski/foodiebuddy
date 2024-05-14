import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { placeId } = body;

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.GOOGLE_PLACES_API_KEY}&fields=name%2Cgeometry`
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({}, { status: 400 });
}
