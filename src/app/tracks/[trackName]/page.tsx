/* eslint-disable @typescript-eslint/no-unsafe-return */
import Link from "next/link";

import Spinner from "@/components/Spinner";
import TracksLayout from "@/components/TracksLayout";
import { TrackCard } from "@/components/TrackCard";
import { api } from "@/trpc/server";
import { headers } from "next/headers";

interface Track {
  id: string;
  trackName: string;
  trackTitle: string;
  authors: string[];
  imgPath: string;
  trackDescription: string;
  trackPath: string;
  order: number | null;
  productionVisible: boolean;
  stagingVisible: boolean;
  visible: boolean;
}

export async function generateStaticParams() {
  const url = process.env.NEXT_PUBLIC_VERCEL_ENV
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000";
  console.log("URL FINAL TRACKS: ", url);

  const tracks = await fetch(`${url}/api/tracks`).then((res) => res.json()); // TODO: DEV_NOTE: We have to create the "URL" environment variable which changes from local/development/production environment. LOCAL is localhost, DEVELOPMENT is the vercel dynamic url and PRODUCTION is the academy domain

  return tracks.map((track: Track) => ({
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

  const tagsForThisTrack = trackData?.tags.map((tag) => tag.tag.tagName);

  return (
    <div className="relative m-10 flex lg:mx-auto lg:max-w-screen-lg">
      <TracksLayout
        trackTitle={trackData?.trackTitle ? trackData?.trackTitle : ""}
        trackDescription={
          trackData?.trackDescription ? trackData?.trackDescription : ""
        }
        trackAuthor={
          trackData?.authors?.length && trackData?.authors[0]
            ? trackData?.authors[0]
            : ""
        }
        // TODO: DEV_NOTE: We need to populate the database with authors information and authors relationship with tracks and lessons using prisma studio: yarn db:studio
        trackAuthorImage="/authors/k4y1s.jpg"
        trackAuthorDescription="I'm a developer trying to break down complex concepts for the rest of us. I'm not smarter than you; I just have more time for research. Web and open-source enthusiast 💚"
        trackAuthorTwitter="K4y1s"
        tags={tagsForThisTrack!}
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
