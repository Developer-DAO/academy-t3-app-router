/* eslint-disable @typescript-eslint/no-unsafe-return */
import Link from "next/link";

import Spinner from "@/components/Spinner";
import TracksLayout from "@/components/TracksLayout";
import { TrackCard } from "@/components/TrackCard";
import { api } from "@/trpc/server";
import { headers } from "next/headers";
import { type Tracks } from "@prisma/client";
import { db } from "@/server/db";

export async function generateStaticParams() {
  const tracks = await db.tracks.findMany();

  return tracks.map((track: Tracks) => ({
    trackName: track.trackPath.replace("/tracks/", ""),
  }));
}

const DynamicTrackPage = async () => {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");

  const trackData = await api.tracks.getTrackByPathname({
    trackPath: pathname!,
  });

  const allLessonsData = await api.lessons.getLessonsByTrackPath({
    trackPath: pathname!,
  });

  const tagsForThisTrack = trackData?.tags.map((tag) => tag.tag.tagName) ?? [];

  return (
    <div className="relative m-10 flex lg:mx-auto lg:max-w-screen-lg">
      <TracksLayout
        trackTitle={trackData?.trackTitle ? trackData?.trackTitle : ""}
        trackDescription={
          trackData?.trackDescription ? trackData?.trackDescription : ""
        }
        trackAuthor={trackData?.trackAuthor ?? ""}
        trackAuthorImage={trackData?.trackAuthorImage ?? "/authors/default.png"}
        trackAuthorDescription={trackData?.trackAuthorDescription ?? ""}
        trackAuthorTwitter={trackData?.trackAuthorTwitter ?? ""}
        tags={tagsForThisTrack}
      >
        <div className="mt-14 flex flex-col gap-8 lg:grid lg:w-full lg:grid-cols-3 lg:gap-10">
          {allLessonsData !== undefined && allLessonsData.length > 0 ? (
            allLessonsData.map((lesson, idx) => {
              const tagsForThisLesson = lesson.tags.map(
                (tag) => tag.tag.tagName,
              );
              return (
                <Link href={lesson.lessonPath} key={idx} className="mx-auto">
                  <TrackCard
                    imgSrc={lesson.imgPath}
                    tags={tagsForThisLesson}
                    title={lesson.lessonTitle}
                    author={lesson.authors}
                    description={lesson.lessonDescription}
                  />
                </Link>
              );
            })
          ) : (
            <Spinner />
          )}
        </div>
      </TracksLayout>
    </div>
  );
};

export default DynamicTrackPage;
