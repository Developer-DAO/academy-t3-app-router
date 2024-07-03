"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Form, useForm } from "react-hook-form";

import type { z } from "zod";
import { api } from "@/trpc/react";
import { Button } from "@/components/Button";
import { useToast } from "@/components/ui/use-toast";
import { addAuthorSchema } from "@/app/(admin)/dashboard/zodschemas/authorOnTrack.schemas";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AddAuthorToTrackFormValues = z.infer<typeof addAuthorSchema>;

function AddAuthorToTrackForm() {
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const { toast } = useToast();

  const trackId = params.trackId;
  const {
    data: contributorsData,
    // isLoading: getcontributorsDataIsLoading,
    // isSuccess: getcontributorsDataIsSuccess,
  } = api.contributors.getAllAvailableByTrackId.useQuery({
    trackId: trackId as string,
  });
  const router = useRouter();
  const { data: session } = useSession();

  const form = useForm<AddAuthorToTrackFormValues>({
    resolver: zodResolver(addAuthorSchema),
  });

  const utils = api.useContext();

  const createContributorOnTrack = api.contributorsOnTracks.create.useMutation({
    onSettled: async () => {
      await utils.contributorsOnTracks.invalidate();
      await utils.tracks.invalidate();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log("request error ", { error });
    },
    onSuccess: () => {
      router.push(`/tracks/${trackId as string}/author`);
      toast({
        variant: "default",
        title: "New author assigned",
        description: "The new author entry was created successfully",
      });
    },
  });

  const onSubmit = (data: AddAuthorToTrackFormValues) => {
    try {
      setLoading(true);
      if (trackId !== undefined && typeof trackId === "string") {
        createContributorOnTrack.mutate({ trackId, ...data });
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
                <FormLabel>Select author</FormLabel>
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
                        placeholder="Select author"
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

          <Button type="submit" disabled={loading} className="outline">
            {!session
              ? "Sign in error"
              : createContributorOnTrack.isIdle
                ? "Loading..."
                : "Save changes"}
          </Button>
          <p className="font-medium text-red-500">
            {createContributorOnTrack.error?.message}
          </p>
        </form>
      </Form>
    </div>
  );
}

export default AddAuthorToTrackForm;
