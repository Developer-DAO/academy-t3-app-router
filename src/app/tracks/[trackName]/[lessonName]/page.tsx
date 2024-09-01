/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetLessonContentByTrackAndLessonName } from "@/lib/lessons";
import { MDXRemote } from "next-mdx-remote/rsc";

import Components from "@/components/mdx/Components";
import { type Lessons } from "@prisma/client";
import { db } from "@/server/db";

type Props = {
  params: { trackName: string; lessonName: string };
};

// export async function generateStaticParams() {
//   const lessons = await db.lessons.findMany({
//     where: {
//       lessonPath: {
//         contains: "fundamentals",
//       },
//     },
//   });

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
