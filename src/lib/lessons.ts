import { promises as fs } from "fs";
import path from "path";

export async function GetLessonContentByTrackAndLessonName(
  trackName: string,
  lessonName: string,
) {
  const filePath = path.resolve(
    "./src",
    "contents",
    trackName,
    `${lessonName}.mdx`,
  );

  const markdown = await fs.readFile(filePath, "utf8");

  return markdown;
}
