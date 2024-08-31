/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use server";

import React from "react";
import { api } from "@/trpc/server";
import { type Metadata, type ResolvingMetadata } from "next";
import { headers } from "next/headers";
import { getMetaImageFromImgPath } from "@/utils/meta-images";

type Props = {
  params: { trackName: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read pathname
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  // fetch data
  const trackData = await api.tracks.getTrackByPathname({
    trackPath: pathname!,
  });

  const metaImagePath = getMetaImageFromImgPath(trackData?.imgPath!);

  return {
    title: `${trackData?.trackTitle} | Developer DAO Academy`,
    description: trackData?.trackDescription,
    openGraph: {
      images: [
        {
          url:
            process.env.NEXT_PUBLIC_VERCEL_URL !== undefined
              ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/meta-images/${metaImagePath}`
              : `/meta-images/${metaImagePath}`,
          alt: trackData?.trackTitle,
        },
      ],
    },
  };
}

export default async function DynamicTrackPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
