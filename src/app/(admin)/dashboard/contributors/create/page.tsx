"use client";

import CreateContributorForm from "@/app/(admin)/dashboard/_components/form/CreateContributorForm";

const AdminCreateContributorPage = () => {
  return (
    <section className="container mx-auto py-16">
      <h1 className="text-center text-2xl ">Create New Contributor</h1>
      <CreateContributorForm />
    </section>
  );
};

export default AdminCreateContributorPage;
