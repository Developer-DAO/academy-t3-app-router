import { useRouter } from "next/router";

import { columns } from "./Columns";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

interface ProductsClientProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export const LessonsTagsTable: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  const handleCreateNewBtnClick = async () => {
    const lessonId = router.query.lessonId;
    await router.push(`/lessons/${lessonId as string}/newtag`);
  };

  return (
    <div className="">
      <div className="flex items-start justify-between ">
        <Heading title={`Tags`} /* (${data})`} */ description="Manage Tags" />
        <div className="mb-4 flex w-full justify-end">
          <Button
            onClick={handleCreateNewBtnClick}
            className="outline hover:bg-black hover:text-white"
          >
            Add new Tag
          </Button>
        </div>
      </div>
      <Separator color="black" />
      <DataTable searchKey="tag.tagName" columns={columns} data={data} />
    </div>
  );
};
