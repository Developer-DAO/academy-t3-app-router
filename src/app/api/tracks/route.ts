import { db } from "@/server/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tracks = await db.tracks.findMany();

    return NextResponse.json(tracks);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
