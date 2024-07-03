"use client";

import { useParams, useRouter } from "next/navigation";

import { columns } from "./Columns";
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";

interface ProductsClientProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any; // Lessons["contributors"];
}

export const TrackAuthorTable: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const handleCreateNewBtnClick = async () => {
    const trackId = params.trackId;
    router.push(`/tracks/${trackId as string}/newauthor`);
  };

  return (
    <div className="">
      <div className="flex items-start justify-between ">
        <Heading
          title={`Author`}
          /* (${data})`} */ description="Manage Author"
        />
        <div className="mb-4 flex w-full justify-end">
          <Button
            onClick={handleCreateNewBtnClick}
            className="outline hover:bg-black hover:text-white"
          >
            Add Author
          </Button>
        </div>
      </div>
      <Separator color="black" />
      <DataTable searchKey="contributor.name" columns={columns} data={data} />
    </div>
  );
};
