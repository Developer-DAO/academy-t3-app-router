"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { FunctionComponent } from "react";

// import { useAccount } from "wagmi";
import { type NavItem, TopBar } from "./TopBar";
import { SideBar } from "./SideBar";
import { cn } from "@/lib/utils";
// import ThemeToggleButton from "@/components/ThemeToggleButton";

const topbarNavMenus: NavItem[] = [
  {
    name: "Fundamentals",
    href: "/fundamentals",
    icon: "clarity_blocks",
  },
  {
    name: "Tracks",
    href: "/tracks",
    icon: "vector",
  },
  {
    name: "Community",
    href: "https://handbook.developerdao.com/",
    icon: "dd_logo",
  },
];

const PageHeader: FunctionComponent = () => {
  // const { isConnected } = useAccount();
  const pathname = usePathname();

  return (
    <header className="app-container absolute left-0 right-0 top-0 z-50 flex items-start justify-between px-8 pt-8 md:flex-row">
      <div className="hidden lg:flex ">
        {pathname === "/" ||
        pathname === "/tracks" ||
        pathname === "/fundamentals" ? (
          <div className="nav-division flex flex-col gap-y-6">
            <div className="flex justify-between">
              <Link href="/">
                <Image
                  src="/academy_logo.svg"
                  width={150}
                  height={40}
                  alt="Academy Logo"
                />
              </Link>
              {/* <ThemeToggleButton hidden={isConnected} /> */}
            </div>
            <div className="mx-auto">
              <TopBar menus={topbarNavMenus} />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-around gap-36 text-white lg:flex lg:justify-between lg:gap-5 lg:self-stretch">
            <div className="lg:ml-8 lg:flex lg:basis-[0%] lg:flex-col lg:items-stretch">
              <BackButton />
            </div>
          </div>
        )}
      </div>
      {pathname === "/" ||
      pathname === "/tracks" ||
      pathname === "/fundamentals" ? (
        <div className="inline-flex gap-2">
          {/* <ThemeToggleButton hidden={pathname !== "/" && isConnected ? false : true} /> */}
          <button>connect wallet..</button>
        </div>
      ) : (
        <>
          <BackButton className="lg:hidden" />
          <div className="hidden gap-2 lg:inline-flex">
            {/* <ThemeToggleButton hidden={pathname !== "/" && isConnected ? false : true} /> */}
            <button>connect wallet..</button>
          </div>
        </>
      )}
      <div className="flex lg:hidden">
        {pathname === "/" ||
        pathname === "/tracks" ||
        pathname === "/fundamentals" ? (
          <SideBar
            menus={[
              ...topbarNavMenus,
              {
                name: "Get In Touch",
                href: "/",
                icon: "dd_logo",
              },
            ]}
          />
        ) : (
          <button>connect wallet..</button>
        )}
      </div>
    </header>
  );
};

export { PageHeader as Header };

export const BackButton = ({ className }: { className?: string }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.back();
      }}
      className={cn(
        "flex flex-col items-center justify-center text-white",
        className,
      )}
    >
      <h2 className={` lg:text-xl`}>Back</h2>
      <Image
        src={"/back.png"}
        alt="turn back"
        width={35}
        height={25}
        className="rotate-180"
      />
    </button>
  );
};
