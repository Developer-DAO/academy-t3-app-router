"use client";

import { useRouter } from "next/navigation";

import { columns } from "./Columns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { DataTable } from "@/components/ui/data-table";

interface ProductsClientProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
}

export const TracksTable: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  const handleCreateNewBtnClick = async () => {
    router.push("/dashboard/tracks/create");
  };
  return (
    <div className="">
      <div className="flex items-start justify-between ">
        <Heading
          title={`Tracks (${data.length})`}
          description="Manage Tracks"
        />
        <div className="mb-4 flex w-full justify-end">
          <Button
            onClick={handleCreateNewBtnClick}
            className="outline hover:bg-black hover:text-white"
          >
            Create New Track
          </Button>
        </div>
      </div>
      <Separator color="black" />
      <DataTable searchKey="trackTitle" columns={columns} data={data} />
    </div>
  );
};
