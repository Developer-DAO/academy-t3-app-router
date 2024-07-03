"use client";

import { useParams } from "next/navigation";
import React from "react";

import { api } from "@/trpc/react";
import { LessonsTable } from "@/app/(admin)/dashboard/_components/lessons-tables/LessonsTable";
import { withAuth } from "@/components/withAuth";

function TrackLessonsPage() {
  const params = useParams();
  const trackId = params.trackId;

  const { data: lessons } = api.lessons.getLessonsByTrackId.useQuery({
    trackId: trackId as string,
  });

  return (
    <section className="container mx-auto py-16">
      {lessons !== undefined && lessons.length > 1 ? (
        <LessonsTable data={lessons} />
      ) : null}
    </section>
  );
}
export default withAuth(TrackLessonsPage);
