"use client";

import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { type Lessons } from "@prisma/client";
import { api } from "@/trpc/react";
import { AlertModal } from "@/app/(admin)/dashboard/_components/AlertModal";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CellActionProps {
  data: Lessons;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const deleteLesson = api.lessons.delete.useMutation({
    onSettled: async () => {
      // await utils.lessons.invalidate();
      setOpen(false);
    },
    onError: (error) => {
      console.log("request error ", { error });
    },
    onSuccess: () => {
      // router.push(`/lessons`); // TODO: redirect to the tracks page where the user clicked the button
      toast({
        variant: "default",
        title: "Lesson deleted",
        description: "The lesson entry was deleted from the database !!",
      });
    },
  });

  const onConfirm = () => {
    try {
      setLoading(true);
      deleteLesson.mutate({ lessonId: data.id });
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
            <span className="sr-only text-black">Open menu</span>
            <Icons.more_horizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => {
              router.push(`/lessons/${data.id}/edit`);
            }}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push(`/lessons/${data.id}/contributors`);
            }}
          >
            <Edit className="mr-2 h-4 w-4" /> Contributors
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
