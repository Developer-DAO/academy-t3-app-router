"use client";

import { useRouter } from "next/navigation";
import { Heading } from "@/components/ui/heading";

import { columns } from "./Columns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

interface ProductsClientProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
}

export const LessonsTable: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  const handleCreateNewBtnClick = async () => {
    router.push("lessons/create");
  };

  return (
    <div>
      <div className="flex items-start justify-between ">
        <Heading
          title={`Lessons (${data.length})`}
          description="Manage Lessons"
        />
        <div className="mb-4 flex w-full justify-end">
          <Button
            onClick={handleCreateNewBtnClick}
            className="outline hover:bg-black hover:text-white"
          >
            Create New Lesson
          </Button>
        </div>
      </div>
      <Separator color="black" />
      <DataTable searchKey="lessonTitle" columns={columns} data={data} />
    </div>
  );
};
