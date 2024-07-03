"use client";

import { useParams } from "next/navigation";
import React from "react";

import { api } from "@/trpc/react";
import { TrackAuthorTable } from "@/app/(admin)/dashboard/_components/track-author-table/TrackAuthorTable";
import { withAuth } from "@/components/withAuth";

function TrackAuthorPage() {
  const params = useParams();
  const trackId = params.trackId;

  const { data: track } = api.tracks.getTrackById.useQuery({
    trackId: trackId as string,
  });

  return (
    <section className="container mx-auto max-h-[80vh] py-16">
      {track !== undefined && track !== null ? (
        <TrackAuthorTable data={track.contributors} />
      ) : null}
    </section>
  );
}
export default withAuth(TrackAuthorPage);
