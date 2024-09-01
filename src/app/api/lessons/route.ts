import { db } from "@/server/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const revalidate = 0;

export async function GET() {
  try {
    const lessons = await db.lessons.findMany({
      where: {
        lessonPath: {
          contains: "fundamentals",
        },
      },
    });

    return NextResponse.json(lessons);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
