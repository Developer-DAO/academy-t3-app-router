/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetLessonContentByTrackAndLessonName } from "@/lib/lessons";
import { MDXRemote } from "next-mdx-remote/rsc";

import Components from "@/components/mdx/Components";
import { type Lessons } from "@prisma/client";

type Props = {
  params: { trackName: string; lessonName: string };
};

// export async function generateStaticParams() {
//   const url = process.env.VERCEL_ENV
//     ? `https://academy-t3-app-router.vercel.app/`
//     : "http://localhost:3000";

//   console.log("URL FINAL LESSONS 1: ", url);
//   const lessons = await fetch(`${url}/api/lessons`, { method: "GET" }).then(
//     (res) => res.json(),
//   );

//   return lessons.map((lesson: Lessons) => ({
//     lessonName: lesson.lessonPath.replace("/fundamentals/", ""),
//   }));
// }

export default async function DynamicLessonPage({ params }: Props) {
  const content = await GetLessonContentByTrackAndLessonName(
    params.trackName,
    params.lessonName,
  );

  return <MDXRemote source={content} components={Components} />;
}
