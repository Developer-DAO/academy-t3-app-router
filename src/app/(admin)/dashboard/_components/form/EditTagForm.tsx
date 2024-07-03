"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import type { z } from "zod";

import { type Tags } from "@prisma/client";
import { tagEditSchema } from "@/app/(admin)/dashboard/zodschemas/tag.schemas";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type EditTagFormValues = z.infer<typeof tagEditSchema>;

interface EditFormProps {
  tagToEditData: Tags;
  tagId: string;
}

function EditTagForm({ tagId, tagToEditData }: EditFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { toast } = useToast();

  const { data: session } = useSession();

  const form = useForm<EditTagFormValues>({
    resolver: zodResolver(tagEditSchema),
    defaultValues: { ...tagToEditData },
  });

  const editTag = api.tags.udpate.useMutation({
    onSettled: async () => {
      // await utils.tags.invalidate();
    },
  });

  const onSubmit = async (data: EditTagFormValues) => {
    try {
      setLoading(true);
      if (tagId !== undefined && typeof tagId === "string") {
        editTag.mutate({ tagId, ...data });
        await router.push(`/tags`);
        toast({
          variant: "default",
          title: "New tag created",
          description: "The new tag entry was created successfully",
        });
      }
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
    <div className="mx-auto max-w-xl space-y-8 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 "
        >
          <FormField
            control={form.control}
            name="tagName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tag Name</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    disabled={loading}
                    placeholder="Tag Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tagDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tag Description</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    disabled={loading}
                    placeholder="Tag Description (internal - not shown)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            {!session
              ? "Sign in error"
              : editTag.isIdle
                ? "Loading..."
                : "Create Tag"}
          </Button>
          <p className="font-medium text-red-500">{editTag.error?.message}</p>
        </form>
      </Form>
    </div>
  );
}

export default EditTagForm;
