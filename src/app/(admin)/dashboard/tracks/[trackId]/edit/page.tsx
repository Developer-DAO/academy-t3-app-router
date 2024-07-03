"use client";

import { useParams } from "next/navigation";

import Spinner from "@/components/Spinner";
import { api } from "@/trpc/react";
import EditTrackFormForm from "@/app/(admin)/dashboard/_components/form/EditTrackForm";
import { withAuth } from "@/components/withAuth";

function EditTrackPage() {
  const params = useParams();
  const trackId = params.trackId;
  const {
    data: trackToEditData,
    isLoading: getTrackByIdIsLoading,
    isSuccess: getTrackByIdIsSuccess,
  } = api.tracks.getTrackById.useQuery({
    trackId: trackId as string,
  });

  return (
    <section>
      <h1 className="text-center text-2xl ">Update Track</h1>
      {getTrackByIdIsLoading ? (
        <Spinner />
      ) : getTrackByIdIsSuccess && trackToEditData !== null ? (
        <EditTrackFormForm
          trackToEditData={trackToEditData}
          trackId={trackId as string}
        />
      ) : null}
    </section>
  );
}
export default withAuth(EditTrackPage);
