"use client";

import { TagsTable } from "@/app/(admin)/dashboard/_components/tags-table/TagsTable";
import { api } from "@/trpc/react";

export default function AdminTagsPage() {
  const { data: tags } = api.tags.getAll.useQuery();

  return (
    <section className="container mx-auto py-16">
      {tags !== undefined && tags.length > 1 ? <TagsTable data={tags} /> : null}
    </section>
  );
}
