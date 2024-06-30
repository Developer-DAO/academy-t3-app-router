import React from "react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Web3 Learning Tracks",
  description:
    "Our Web3 courses are designed to get you from 0 to 1 via project-based learning tracks.",
  openGraph: {
    images: [
      {
        url:
          process.env.NEXT_PUBLIC_VERCEL_URL !== undefined
            ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/meta-images/academy-web3-tracks.png`
            : "/meta-images/academy-web3-tracks.png",
        alt: "Web3 Learning Tracks",
      },
    ],
  },
};

export default async function TracksPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
