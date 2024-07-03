import CreateLessonForm from "@/app/(admin)/dashboard/_components/form/CreateLessonForm";

const AdminCreateLessonPage = () => {
  return (
    <section className="container mx-auto py-16">
      <h1 className="text-center text-2xl ">Create New Lesson</h1>
      <CreateLessonForm />
    </section>
  );
};

export default AdminCreateLessonPage;
