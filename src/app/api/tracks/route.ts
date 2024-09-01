import { db } from "@/server/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const revalidate = 0;

export async function GET() {
  console.log("GET TRACKS ");
  try {
    console.log("GET TRACKS inside try");

    const tracks = await db.tracks.findMany();
    console.log("GET TRACKS - before response.json ", { tracks });

    return NextResponse.json(tracks);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
