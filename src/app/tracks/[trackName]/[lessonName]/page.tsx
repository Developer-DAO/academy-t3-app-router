import { GetLessonContentByTrackAndLessonName } from "@/lib/lessons";
import { MDXRemote } from "next-mdx-remote/rsc";

import Components from "@/components/mdx/Components";
import { type Lessons, type Tracks } from "@prisma/client";
import { db } from "@/server/db";

type Props = {
  params: { trackName: string; lessonName: string };
};

type LessonWithTrack = Lessons & {
  track: Tracks;
};

export async function generateStaticParams({ params }: Props) {
  const lessons = await db.lessons.findMany({
    include: {
      track: true,
    },
  });

  return lessons.map((lesson: LessonWithTrack) => ({
    trackName: lesson.track.trackPath.replace(`/tracks/`, ""),
    lessonName: lesson.lessonPath.replace(`/tracks/${params.trackName}/`, ""),
  }));
}

export default async function DynamicLessonPage({ params }: Props) {
  const content = await GetLessonContentByTrackAndLessonName(
    params.trackName,
    params.lessonName,
  );

  return <MDXRemote source={content} components={Components} />;
}
