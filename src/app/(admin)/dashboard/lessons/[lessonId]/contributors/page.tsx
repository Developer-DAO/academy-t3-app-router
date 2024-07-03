"use client";

import { api } from "@/trpc/react";
import { LessonsContributorsTable } from "@/app/(admin)/dashboard/_components/lessons-contributors-table/LessonsContributorsTable";
import { useParams } from "next/navigation";

function LessonContributorsPage() {
  const params = useParams();
  const lessonId = params.lessonId;

  const { data: lesson } = api.lessons.getLessonsById.useQuery({
    lessonId: lessonId as string,
  });

  return (
    <section className="container mx-auto max-h-[80vh] py-16">
      {lesson !== undefined && lesson !== null ? (
        <LessonsContributorsTable data={lesson.contributors} />
      ) : null}
    </section>
  );
}

export default LessonContributorsPage;
