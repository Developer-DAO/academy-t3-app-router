import React from "react";
import { type Metadata } from "next";
import { api } from "@/trpc/server";
import { headers } from "next/headers";

const headersList = headers();
const domain = headersList.get("host") ?? "";
const fullUrl = headersList.get("referer") ?? "";
const [, pathname] =
  fullUrl.match(new RegExp(`https?:\/\/${domain}(.*)`)) ?? [];
const trackData = await api.tracks.getTrackByPathname({
  trackPath: pathname!,
});

export const metadata: Metadata = {
  title: trackData?.trackTitle,
  description: trackData?.trackDescription,
  openGraph: {
    images: [
      {
        url:
          process.env.NEXT_PUBLIC_VERCEL_URL !== undefined
            ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/meta-images/arweave-101/building-apps-on-arweave.png`
            : "/meta-images/arweave-101/building-apps-on-arweave.png",
        alt: trackData?.trackTitle,
      },
    ],
  },
};

export default async function TrackPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
