import { GetLessonContentByTrackAndLessonName } from "@/lib/lessons";
import { MDXRemote } from "next-mdx-remote/rsc";
import Components from "@/components/mdx/Components";
import { type Lessons } from "@prisma/client";
import { db } from "@/server/db";

type Props = {
  params: { lessonName: string };
};

export async function generateStaticParams() {
  const lessons = await db.lessons.findMany({
    where: {
      lessonPath: {
        contains: "fundamentals",
      },
    },
  });

  return lessons.map((lesson: Lessons) => ({
    lessonName: lesson.lessonPath.replace("/fundamentals/", ""),
  }));
}

export default async function DynamicLessonPage({ params }: Props) {
  const content = await GetLessonContentByTrackAndLessonName(
    "fundamentals",
    params.lessonName,
  );

  return <MDXRemote source={content} components={Components} />;
}
