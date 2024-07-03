import { useRouter } from "next/navigation";

import { columns } from "./Columns";
import { type Contributors } from "@prisma/client";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

interface ProductsClientProps {
  data: Contributors[];
}

export const ContributorsTable: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  const handleCreateNewBtnClick = async () => {
    router.push("contributors/create");
  };
  return (
    <div className="">
      <div className="flex items-start justify-between ">
        <Heading
          title={`Contributors (${data.length})`}
          description="Manage Contributors"
        />
        <div className="mb-4 flex w-full justify-end">
          <Button
            onClick={handleCreateNewBtnClick}
            className="outline hover:bg-black hover:text-white"
          >
            Create New Contributor
          </Button>
        </div>
      </div>
      <Separator color="white" />
      <DataTable searchKey="name" columns={columns} data={data} />
    </div>
  );
};
