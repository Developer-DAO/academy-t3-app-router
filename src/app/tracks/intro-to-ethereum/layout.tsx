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
  const trackData = await api.tracks.getTrackByPathname({
    trackPath: pathname,
  });
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images ?? [];

  return {
    title: trackData?.trackTitle,
    description: trackData?.trackDescription,
    openGraph: {
      images: [
        {
          url:
            process.env.NEXT_PUBLIC_VERCEL_URL !== undefined
              ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/meta-images/a-developers-guide-to-ethereum.png`
              : "/meta-images/a-developers-guide-to-ethereum.png",
          alt: trackData?.trackTitle,
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
