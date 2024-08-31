/* eslint-disable @typescript-eslint/no-unsafe-return */
import { GetLessonContentByTrackAndLessonName } from "@/lib/lessons";
import { MDXRemote } from "next-mdx-remote/rsc";
import Components from "@/components/mdx/Components";
import { type Lessons } from "@prisma/client";

type Props = {
  params: { lessonName: string };
};

export async function generateStaticParams() {
  const url = process.env.NEXT_PUBLIC_VERCEL_ENV
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000";

  const lessons = await fetch(`${url}/api/lessons`).then((res) => res.json());

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
