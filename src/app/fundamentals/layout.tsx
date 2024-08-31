import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Web3 Coding Fundamentals",
  description:
    "Learn the basics of web3 programming. Our Fundamentals cover wallets, RPCs, Smart Contract Testing, Command Line Basics and more.",
  openGraph: {
    images: [
      {
        url:
          process.env.NEXT_PUBLIC_VERCEL_URL !== undefined
            ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/academy-web3-fundamentals.png`
            : "/academy-web3-fundamentals.png",
        alt: "Web3 Coding Fundamentals",
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
