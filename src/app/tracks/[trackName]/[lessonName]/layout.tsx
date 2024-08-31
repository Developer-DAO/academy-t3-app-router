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

  return {
    title: `${lessonData?.lessonTitle} | Developer DAO Academy`,
    description: lessonData?.lessonDescription,
    openGraph: {
      images: [
        {
          url:
            process.env.NEXT_PUBLIC_VERCEL_URL !== undefined
              ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/meta-images/default-meta-image.png`
              : "/meta-images/default-meta-image.png",
          alt: lessonData?.lessonDescription,
        },
      ],
    },
  };
}

export default async function DynamicLessonPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}