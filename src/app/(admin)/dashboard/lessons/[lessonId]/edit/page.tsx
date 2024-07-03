"use client";

import EditLessonForm from "@/app/(admin)/dashboard/_components/form/EditLessonForm";
import Spinner from "@/components/Spinner";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";

export default function EditLessonPage() {
  const params = useParams();
  const lessonId = params.lessonId;
  const {
    data: lessonToEditData,
    isLoading: getLessonByIdIsLoading,
    isSuccess: getLessonByIdIsSuccess,
  } = api.lessons.getLessonsById.useQuery({
    lessonId: lessonId as string,
  });
  return (
    <section className="container mx-auto py-16">
      <h1 className="text-center text-2xl ">Update Lesson</h1>
      {getLessonByIdIsLoading ? (
        <Spinner />
      ) : getLessonByIdIsSuccess && lessonToEditData !== null ? (
        <EditLessonForm
          lessonToEditData={lessonToEditData}
          lessonId={lessonId as string}
        />
      ) : null}
    </section>
  );
}
