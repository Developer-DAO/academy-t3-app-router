"use client";

import { LessonsTable } from "@/app/(admin)/dashboard/_components/lessons-tables/LessonsTable";
import { api } from "@/trpc/react";
import React from "react";

export default function AdminLessonsPage() {
  const { data: lessons } = api.lessons.getAll.useQuery();

  return (
    <section className="container mx-auto py-16">
      {lessons !== undefined && lessons.length > 1 ? (
        <LessonsTable data={lessons} />
      ) : null}
    </section>
  );
}
