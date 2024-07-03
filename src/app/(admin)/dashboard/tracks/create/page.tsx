import CreateTrackForm from "@/app/(admin)/dashboard/_components/form/CreateTrackForm";
import { withAuth } from "@/components/withAuth";

const CreateTrackPage = () => {
  return (
    <section>
      <h1 className="pt-10 text-center text-2xl">Create New Track</h1>
      <CreateTrackForm />
    </section>
  );
};

export default withAuth(CreateTrackPage);
