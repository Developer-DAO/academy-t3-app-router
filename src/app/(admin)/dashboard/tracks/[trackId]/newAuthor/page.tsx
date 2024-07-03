import AddAuthorToTrackForm from "@/app/(admin)/dashboard/_components/form/AddAuthorToTrackForm";
import { withAuth } from "@/components/withAuth";
import React from "react";

function NewContributorPage() {
  return (
    <section className="container mx-auto py-16">
      <h1 className="text-center text-2xl ">Add new contributor </h1>
      <AddAuthorToTrackForm />
    </section>
  );
}
export default withAuth(NewContributorPage);
