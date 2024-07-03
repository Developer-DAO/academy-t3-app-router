"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import type { z } from "zod";
import { addContributorSchema } from "@/app/(admin)/dashboard/zodschemas/contributorOnLesson.schemas";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type AddContributorToLessonFormValues = z.infer<typeof addContributorSchema>;

function AddContributorToLessonForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const lessonId = router.query.lessonId;
  const {
    data: contributorsData,
    // isLoading: getcontributorsDataIsLoading,
    // isSuccess: getcontributorsDataIsSuccess,
  } = api.contributors.getAllAvailableByLessonId.useQuery({
    lessonId: lessonId as string,
  });

  const { data: session } = useSession();

  const form = useForm<AddContributorToLessonFormValues>({
    resolver: zodResolver(addContributorSchema),
  });

  const utils = api.useContext();

  const createContributorOnLesson =
    api.contributorsOnLessons.create.useMutation({
      onSettled: async () => {
        await utils.contributorsOnLessons.invalidate();
        await utils.lessons.invalidate();
      },
      onError: (error) => {
        console.log("request error ", { error });
      },
      onSuccess: async () => {
        await router.push(`/lessons/${lessonId as string}/contributors`);
        toast({
          variant: "default",
          title: "New contributor added",
          description: "The new contributor entry was created successfully",
        });
      },
    });

  const onSubmit = (data: AddContributorToLessonFormValues) => {
    try {
      setLoading(true);
      if (lessonId !== undefined && typeof lessonId === "string") {
        createContributorOnLesson.mutate({ lessonId, ...data });
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
            name="contributorId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select contributor</FormLabel>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full bg-white text-black">
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select contributor"
                      />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {contributorsData?.map((contributor, idx) => (
                      <SelectItem key={idx} value={contributor.id}>
                        {contributor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="typeOfContribution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type of contribution</FormLabel>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full bg-white text-black">
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select the type of contribution"
                      />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {["author", "coauthor", "editor"].map((type, idx) => (
                      <SelectItem key={idx} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading}>
            {!session
              ? "Sign in error"
              : createContributorOnLesson.isIdle
                ? "Loading..."
                : "Save changes"}
          </Button>
          <p className="font-medium text-red-500">
            {createContributorOnLesson.error?.message}
          </p>
        </form>
      </Form>
    </div>
  );
}

export default AddContributorToLessonForm;
