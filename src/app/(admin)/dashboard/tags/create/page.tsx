"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Form, useForm } from "react-hook-form";

import type { z } from "zod";

import { api } from "@/trpc/react";
import { tagCreateSchema } from "@/app/(admin)/dashboard/zodschemas/tag.schemas";
import { useToast } from "@/components/ui/use-toast";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type CreateTagFormValues = z.infer<typeof tagCreateSchema>;

export default function CreateNewTagPage() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const { data: session } = useSession();

  const form = useForm<CreateTagFormValues>({
    resolver: zodResolver(tagCreateSchema),
  });

  const createTag = api.tags.create.useMutation({
    onSettled: async () => {
      // await utils.tags.invalidate();
    },
  });

  const onSubmit = async (data: CreateTagFormValues) => {
    try {
      setLoading(true);
      createTag.mutate(data);
      router.push(`/tags`);
      toast({
        variant: "default",
        title: "New tag created",
        description: "The new tag entry was created successfully",
      });
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
    <section className="container mx-auto py-16">
      <h1 className="text-center text-2xl ">Create New Tag</h1>
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
                : createTag.isIdle
                  ? "Loading..."
                  : "Create Tag"}
            </Button>
            <p className="font-medium text-red-500">
              {createTag.error?.message}
            </p>
          </form>
        </Form>
      </div>
    </section>
  );
}
