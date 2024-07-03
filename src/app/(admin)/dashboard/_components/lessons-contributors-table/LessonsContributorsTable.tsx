import { useParams, useRouter } from "next/navigation";

import { columns } from "./Columns";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

interface ProductsClientProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any; // Lessons["contributors"];
}

export const LessonsContributorsTable: React.FC<ProductsClientProps> = ({
  data,
}) => {
  const router = useRouter();
  const params = useParams();
  const handleCreateNewBtnClick = async () => {
    const lessonId = params.lessonId;
    router.push(`/lessons/${lessonId as string}/newcontributor`);
  };
  return (
    <div className="">
      <div className="flex items-start justify-between ">
        <Heading
          title={`Contributors`}
          /* (${data})`} */ description="Manage Contributors"
        />
        <div className="mb-4 flex w-full justify-end">
          <Button
            onClick={handleCreateNewBtnClick}
            className="outline hover:bg-black hover:text-white"
          >
            Add new Contributor
          </Button>
        </div>
      </div>
      <Separator color="black" />
      <DataTable searchKey="contributor.name" columns={columns} data={data} />
    </div>
  );
};
