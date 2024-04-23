import { authOptions } from "@/utils/authOptions";
import { createClient } from "@supabase/supabase-js";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session == null || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase.storage
    .from("foodiebuddy-images")
    .createSignedUploadUrl("images");
  console.log(data, error);

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
  console.log(data);
  return NextResponse.json(data);
}
