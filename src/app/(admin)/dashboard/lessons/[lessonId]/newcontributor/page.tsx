"use client";

import AddContributorToLessonForm from "@/app/(admin)/dashboard/_components/form/AddContributorToLessonForm";

export default function NewContributorOnLessonPage() {
  return (
    <section className="container mx-auto py-16">
      <h1 className="text-center text-2xl ">Add new contributor </h1>
      <AddContributorToLessonForm />
    </section>
  );
}
