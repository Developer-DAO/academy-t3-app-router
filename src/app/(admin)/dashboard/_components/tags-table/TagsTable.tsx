import { useRouter } from "next/navigation";

// import { User } from "@/constants/data";
// import { Plus } from "lucide-react";
import { columns } from "./Columns";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

interface ProductsClientProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
}

export const TagsTable: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  const handleCreateNewBtnClick = async () => {
    router.push("tags/create");
  };
  return (
    <div className="">
      <div className="flex items-start justify-between ">
        <Heading title={`Tags (${data.length})`} description="Manage Tags" />
        <div className="mb-4 flex w-full justify-end">
          <Button
            onClick={handleCreateNewBtnClick}
            className="outline hover:bg-black hover:text-white"
          >
            Create New Tag
          </Button>
        </div>
      </div>
      <Separator color="white" />
      <DataTable searchKey="tagName" columns={columns} data={data} />
    </div>
  );
};
