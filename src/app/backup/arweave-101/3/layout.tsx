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
  const headerList = headers();
  const pathname = headerList.get("x-current-path");

  // fetch data
  const lessonData = await api.lessons.getLessonsByLessonPath({
    lessonPath: pathname!,
  });
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images ?? [];

  return {
    title: lessonData?.lessonTitle,
    description: lessonData?.lessonDescription,
    openGraph: {
      images: [
        {
          url:
            process.env.NEXT_PUBLIC_VERCEL_URL !== undefined
              ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/meta-images/default-meta-image.png`
              : "/meta-images/default-meta-image.png",
          alt: lessonData?.lessonTitle,
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
