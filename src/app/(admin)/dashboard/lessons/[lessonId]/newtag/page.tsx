"use client";

import AddTagToLessonForm from "@/app/(admin)/dashboard/_components/form/AddTagToLessonForm";

export default function NewTagPage() {
  return (
    <section className="container mx-auto py-16">
      <h1 className="text-center text-2xl ">Add new tag </h1>
      <AddTagToLessonForm />
    </section>
  );
}
