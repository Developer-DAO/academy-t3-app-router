"use client";

import Link from "next/link";
// import type { ReactElement } from "react";

// import PageSeoLayout from "@/components/PageSeoLayout";
import Spinner from "@/components/Spinner";
import TracksLayout from "@/components/TracksLayout";
import { api } from "@/trpc/react";
import { TrackCard } from "@/components/TrackCard";
import { usePathname } from "next/navigation";

const OraclesApi3TrackPage = () => {
  const pathname = usePathname();

  const { data: allLessonsData } = api.lessons.getLessonsByTrackPath.useQuery(
    { trackPath: pathname },
    {
      refetchOnWindowFocus: false,
    },
  );

  return (
    <div className="relative m-10 flex lg:mx-auto lg:max-w-screen-lg">
      <TracksLayout
        trackTitle="Learn How API3 Brings Data Onchain in Web3"
        trackDescription="Using API3 technology to solve blockchain problems with oracles."
        trackAuthor="BillyJitsu"
        trackAuthorImage="/authors/default.png"
        trackAuthorDescription="Active Developer DAO member"
        trackAuthorTwitter="wc49358"
        tags={["Infra", "Oracles", "API3"]}
      >
        <div className="mt-14 flex flex-col gap-8 lg:grid lg:w-full lg:grid-cols-3 lg:gap-10">
          {allLessonsData !== undefined && allLessonsData.length > 0 ? (
            allLessonsData.map((lesson, idx) => {
              const tagsForThisLesson = lesson.tags.map(
                (tag) => tag.tag.tagName,
              );
              return (
                <Link href={lesson.lessonPath} key={idx}>
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

// OraclesApi3TrackPage.getLayout = function getLayout(page: ReactElement) {
//   return (
//     <PageSeoLayout
//       title="API3 Oracles Track Page"
//       description="Using API3 technology to solve blockchain problems with oracles."
//     >
//       {page}
//     </PageSeoLayout>
//   );
// };

export default OraclesApi3TrackPage;
