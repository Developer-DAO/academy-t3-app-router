"use client";

import { ContributorsTable } from "@/app/(admin)/dashboard/_components/contributors-table/ContributorsTable";
import { api } from "@/trpc/react";

export default function AdminContributorsPage() {
  const {
    data: contributors,
    isLoading,
    isSuccess,
  } = api.contributors.getAll.useQuery();

  return (
    <section className="container mx-auto py-16">
      {!isLoading && isSuccess ? (
        <ContributorsTable data={contributors} />
      ) : null}
    </section>
  );
}
