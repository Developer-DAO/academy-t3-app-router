"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import type { z } from "zod";
import { lessonCreateSchema } from "@/app/(admin)/dashboard/zodschemas/lesson.schemas";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type CreateLessonFormValues = z.infer<typeof lessonCreateSchema>;

function CreateLessonForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const {
    data: tracksData,
    // isLoading: getTracksDataIsLoading,
    // isSuccess: getTracksDataIsSuccess,
  } = api.tracks.getAll.useQuery();

  const { data: session } = useSession();

  const form = useForm<CreateLessonFormValues>({
    resolver: zodResolver(lessonCreateSchema),
  });

  const createLesson = api.lessons.create.useMutation({
    onSettled: async () => {
      // await utils.lessons.invalidate();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log("request error ", { error });
    },
    onSuccess: async () => {
      await router.push(`/tracks`); // TODO: redirect to the tracks page where the user clicked the button
      toast({
        variant: "default",
        title: "New lesson created",
        description: "The new lesson entry was created successfully",
      });
    },
  });

  const onSubmit = (data: CreateLessonFormValues) => {
    try {
      setLoading(true);
      createLesson.mutate(data);
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
            name="lessonTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lesson Title</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    disabled={loading}
                    placeholder="Lesson Title "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="trackId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Track</FormLabel>
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
                        placeholder="Select the Track"
                      />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {tracksData?.map((track, idx) => (
                      <SelectItem key={idx} value={track.id}>
                        {track.trackTitle}
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
            name="lessonDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lesson Description</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    disabled={loading}
                    placeholder="Lesson Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quizFileName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lesson quiz File Name</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    disabled={loading}
                    placeholder="Lesson's quiz File Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imgPath"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lesson Image URL</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    disabled={loading}
                    placeholder="e.g '/newlesson_image.png'"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lessonPath"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lesson Path</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    disabled={loading}
                    placeholder="Lesson Path"
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
              : createLesson.isIdle
                ? "Loading..."
                : "Save changes"}
          </Button>
          <p className="font-medium text-red-500">
            {createLesson.error?.message}
          </p>
        </form>
      </Form>
    </div>
  );
}

export default CreateLessonForm;
