"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Form, useForm } from "react-hook-form";

import type { z } from "zod";
import { trackCreateSchema } from "@/app/(admin)/dashboard/zodschemas/track.schemas";
import { Button } from "@/components/Button";
import { Icons } from "@/components/Icons";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";

type CreateTrackFormValues = z.infer<typeof trackCreateSchema>;

function CreateTrackForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const { data: session } = useSession();

  const form = useForm<CreateTrackFormValues>({
    resolver: zodResolver(trackCreateSchema),
  });

  const createTrack = api.tracks.create.useMutation({
    onSettled: async () => {
      // await api.tracks.invalidate();
    },
  });

  const onSubmit = async (data: CreateTrackFormValues) => {
    try {
      setLoading(true);
      createTrack.mutate(data);
      router.push(`/tracks`);
      toast({
        variant: "default",
        title: "New track created",
        description: "The new track entry was created successfully",
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
    <div className="mx-auto max-w-xl space-y-8 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 "
        >
          <FormField
            control={form.control}
            name="trackTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Track Title</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    disabled={loading}
                    placeholder="Track Title "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="trackName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Track Name</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    disabled={loading}
                    placeholder="Track Name(internal - not shown)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="trackDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Track Description</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    disabled={loading}
                    placeholder="Track Description"
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
                <FormLabel className="flex justify-between">
                  Track Image URL
                  <TooltipProvider delayDuration={30}>
                    <Tooltip>
                      <TooltipTrigger type="button">
                        <Icons.info size={17} />
                      </TooltipTrigger>
                      <TooltipContent className="text-md bg-white text-black">
                        <p>
                          The value of this field should be the path to the
                          image inside the public folder. e.g.:
                          &quot;/newtrack_image.png&quot; <br />
                          The example will be for an image at root level inside
                          public folder an so on.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    disabled={loading}
                    placeholder="e.g: '/newtrack_image.png'"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="trackPath"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-between">
                  Track Path
                  <TooltipProvider delayDuration={30}>
                    <Tooltip>
                      <TooltipTrigger type="button">
                        <Icons.info size={17} />
                      </TooltipTrigger>
                      <TooltipContent className="text-md bg-white text-black">
                        <p>
                          The value of this field should be the path to the new
                          track e.g.: &quot;/tracks/newtrack&quot;. <br /> The
                          track path is defined by the pages routing feature.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>{" "}
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    disabled={loading}
                    placeholder="Track Path e.g.: /tracks/newtrack"
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
              : createTrack.isIdle
                ? "Loading..."
                : "Create Track"}
          </Button>
          <p className="font-medium text-red-500">
            {createTrack.error?.message}
          </p>
        </form>
      </Form>
    </div>
  );
}

export default CreateTrackForm;
