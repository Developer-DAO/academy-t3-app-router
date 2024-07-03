"use client";

import { useParams } from "next/navigation";

import Spinner from "@/components/Spinner";
import { api } from "@/trpc/react";
import EditTagForm from "@/app/(admin)/dashboard/_components/form/EditTagForm";

export default function EditTagPage() {
  const params = useParams();
  const tagId = params.tagId;
  const {
    data: tagToEditData,
    isLoading: getTrackByIdIsLoading,
    isSuccess: getTrackByIdIsSuccess,
  } = api.tags.getTagById.useQuery({
    tagId: tagId as string,
  });

  return (
    <section className="container mx-auto py-16">
      <h1 className="text-center text-2xl ">Update Tag</h1>
      {getTrackByIdIsLoading ? (
        <Spinner />
      ) : getTrackByIdIsSuccess && tagToEditData !== null ? (
        <EditTagForm tagToEditData={tagToEditData} tagId={tagId as string} />
      ) : null}
    </section>
  );
}
