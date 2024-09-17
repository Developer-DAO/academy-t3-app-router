import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import localFont from "next/font/local";
import { Zen_Kaku_Gothic_Antique } from "next/font/google";
import { type Metadata } from "next";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Providers from "@/components/Providers";
import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "http://localhost:3000",
  ),
  title: {
    template: "%s | Developer DAO Academy",
    default: "Learn web3 with Friends | Developer DAO Academy",
  },
  description:
    "Start your journey to become a Web3 Developer today. Free high-quality courses to learn web3 with Developer DAO Academy.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "Learn web3 with Friends | Developer DAO Academy",
    description:
      "Start your journey to become a Web3 Developer today. Free high-quality courses to learn web3 with Developer DAO Academy.",
    url:
      process.env.NEXT_PUBLIC_VERCEL_URL !== undefined
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : "",
    siteName: `Developer DAO Academy`,
    images: [
      {
        url:
          process.env.NEXT_PUBLIC_VERCEL_URL !== undefined
            ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/default-meta-image.png`
            : "/default-meta-image.png",
        alt: "Learn Web3 With Friends | Developer DAO Academy",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    // title: 'Next.js',
    // description: "The React Framework for the Web",
    site: "@devdao_academy",
    creator: "@devdao_academy",
    // creatorId: "1467726470533754880",
    images: ["https://nextjs.org/og.png"], // Must be an absolute URL
  },
};

const zenKakuFont = Zen_Kaku_Gothic_Antique({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-zen-kaku",
});

// Font files can be colocated inside of `app/fonts`
const andalemoFont = localFont({
  src: "../../public/fonts/ANDALEMO.ttf",
  display: "swap",
  variable: "--font-andale-mono",
});

const bttfFont = localFont({
  src: "../../public/fonts/BTTF.ttf",
  display: "swap",
  variable: "--font-future",
});

const deathStarFont = localFont({
  src: "../../public/fonts/DeathStar.otf",
  display: "swap",
  variable: "--font-deathstar",
});

const clashDisplayFont = localFont({
  src: "../../public/fonts/ClashDisplay.ttf",
  display: "swap",
  variable: "--font-clash-display",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <Providers>
            <Header />
            <main
              className={`${andalemoFont.variable} ${bttfFont.variable} ${deathStarFont.variable} ${zenKakuFont.variable} ${clashDisplayFont.variable}`}
            >
              {children}
            </main>
            <Footer />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
