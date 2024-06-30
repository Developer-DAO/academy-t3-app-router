"use server";

import React from "react";
import { api } from "@/trpc/server";
import { type Metadata, type ResolvingMetadata } from "next";
import { headers } from "next/headers";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read pathname
  const pathname = headers().get("next-url") ?? "";

  // fetch data
  const lesson = await api.lessons.getLessonsByLessonPath({
    lessonPath: pathname,
  });
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images ?? [];

  return {
    title: lesson?.lessonTitle,
    description: lesson?.lessonDescription,
    openGraph: {
      images: [
        {
          url:
            process.env.NEXT_PUBLIC_VERCEL_URL !== undefined
              ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/meta-images/arweave-101/building-apps-on-arweave.png`
              : "/meta-images/arweave-101/building-apps-on-arweave.png",
          alt: lesson?.lessonTitle,
        },
      ],
    },
  };
}

export default async function TrackPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
