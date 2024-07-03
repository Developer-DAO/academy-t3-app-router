"use client";

import { LessonsTagsTable } from "@/app/(admin)/dashboard/_components/lessons-tags-table/LessonsTagsTable";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";

export default function LessonTagPage() {
  const params = useParams();
  const lessonId = params.lessonId;

  const { data: lesson } = api.lessons.getLessonsById.useQuery({
    lessonId: lessonId as string,
  });

  return (
    <section className="container mx-auto max-h-[80vh] py-16">
      {lesson !== undefined && lesson !== null ? (
        <LessonsTagsTable data={lesson.tags} />
      ) : null}
    </section>
  );
}
