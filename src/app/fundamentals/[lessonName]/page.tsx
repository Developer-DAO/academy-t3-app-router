/* eslint-disable @typescript-eslint/no-unsafe-return */
import { GetLessonContentByTrackAndLessonName } from "@/lib/lessons";
import { MDXRemote } from "next-mdx-remote/rsc";
import Components from "@/components/mdx/Components";
import { type Lessons } from "@prisma/client";
// import { getBaseUrl } from "@/lib/url";
import { db } from "@/server/db";

type Props = {
  params: { lessonName: string };
};

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  // const url = process.env.VERCEL_ENV ? getBaseUrl() : "http://localhost:3000";
  // const url = getBaseUrl();

  // console.log("URL FINAL LESSONS 2: ", url);

  // const lessons = await fetch(`${url}/api/lessons`, { method: "GET" }).then(
  //   (res) => res.json(),
  // );

  const lessons = await db.lessons.findMany({
    where: {
      lessonPath: {
        contains: "fundamentals",
      },
    },
  });

  console.log("generateStaticParams ", { lessons });

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
