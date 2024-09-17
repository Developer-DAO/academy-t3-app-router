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

  return lessons
    .filter(
      (lesson: LessonWithTrack) =>
        !lesson.lessonPath.includes("/fundamentals/"),
    )
    .map((lesson: LessonWithTrack) => {
      const trackName = lesson.track.trackPath.replace(`/tracks/`, "");
      const lessonName = lesson.lessonPath.replace(`/tracks/${trackName}/`, "");

      return {
        trackName: trackName,
        lessonName: lessonName,
      };
    });
}

export default async function DynamicLessonPage({ params }: Props) {
  const content = await GetLessonContentByTrackAndLessonName(
    params.trackName,
    params.lessonName,
  );

  return <MDXRemote source={content} components={Components} />;
}
