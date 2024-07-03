"use client";

import { TracksTable } from "@/app/(admin)/dashboard/_components/tracks-table/TracksTable";
import { withAuth } from "@/components/withAuth";
import { api } from "@/trpc/react";
import React from "react";

const AdminDashboardPage = () => {
  const { data: tracks } = api.tracks.getAll.useQuery();

  return (
    <section className="container mx-auto py-16">
      {tracks !== undefined && tracks.length > 1 ? (
        <TracksTable data={tracks} />
      ) : null}
    </section>
  );
};

export default withAuth(AdminDashboardPage);
