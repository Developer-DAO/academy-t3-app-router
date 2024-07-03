"use client";

import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { type Tracks } from "@prisma/client";
import { api } from "@/trpc/react";
import { AlertModal } from "@/app/(admin)/dashboard/_components/AlertModal";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/Button";
import { Icons } from "@/components/Icons";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface CellActionProps {
  data: Tracks;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const utils = api.useContext();

  const deleteTrack = api.tracks.delete.useMutation({
    onSettled: async () => {
      await utils.tracks.invalidate();
      setOpen(false);
    },
    onError: (error) => {
      console.log("request error ", { error });
    },
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Track deleted",
        description: "The track entry was deleted from the database !!",
      });
    },
  });

  const onConfirm = () => {
    try {
      setLoading(true);
      deleteTrack.mutate({ trackId: data.id });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button>
            <span className="sr-only ">Open menu</span>
            <Icons.more_horizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => {
              router.push(`/dashboard/tracks/${data.id}/edit`);
            }}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push(`/dashboard/tracks/${data.id}/lessons`);
            }}
          >
            <Edit className="mr-2 h-4 w-4" /> Lessons
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push(`/dashboard/tracks/${data.id}/author`);
            }}
          >
            <Edit className="mr-2 h-4 w-4" /> Author
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
