import React from "react";
import { type Metadata } from "next";
import { api } from "@/trpc/server";
import { headers } from "next/headers";

const headersList = headers();
const domain = headersList.get("host") ?? "";
const fullUrl = headersList.get("referer") ?? "";
const [, pathname] =
  fullUrl.match(new RegExp(`https?:\/\/${domain}(.*)`)) ?? [];
const lesson = await api.lessons.getLessonsByLessonPath({
  lessonPath: pathname!,
});
export const metadata: Metadata = {
  title: lesson?.lessonTitle,
  description: lesson?.lessonDescription,
  openGraph: {
    images: [
      {
        url:
          process.env.NEXT_PUBLIC_VERCEL_URL !== undefined
            ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/meta-images/default-meta-image.png`
            : "/meta-images/default-meta-image.png",
        alt: lesson?.lessonTitle,
      },
    ],
  },
};

export default async function FundamentalsPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
