import { authOptions } from "@/utils/authOptions";
import { v4 as uuid } from "uuid";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const rankingId = request.nextUrl.searchParams.get("rankingId");

  if (session == null || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase.storage
    .from("foodiebuddy-images")
    .createSignedUploadUrl(`${rankingId}/${uuid()}`);

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
  return NextResponse.json(data);
}
