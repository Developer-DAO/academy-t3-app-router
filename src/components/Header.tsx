"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type FunctionComponent } from "react";

import { type NavItem, TopBar } from "./TopBar";
import { SideBar } from "./SideBar";
import { cn } from "@/lib/utils";
import { ConnectButton } from "@/components/ConnectButton";

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
    name: "Posts",
    href: "https://blog.developerdao.com/",
    icon: "states",
  },
  {
    name: "Community",
    href: "https://handbook.developerdao.com/",
    icon: "dd_logo",
  },
];

const PageHeader: FunctionComponent = () => {
  const pathname = usePathname();

  return (
    <header
      className="absolute top-2 z-40 flex w-full items-center justify-between bg-transparent  px-[15px]
     pt-[30px] md:px-[30px]  md:pt-[20px]"
    >
      <div className="z-50  hidden lg:flex">
        {pathname === "/" ||
        pathname === "/tracks" ||
        pathname === "/fundamentals" ? (
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
        ) : (
          <div className="flex items-center justify-around gap-36 text-white lg:flex lg:justify-between lg:gap-5 lg:self-stretch">
            <div className="lg:ml-8 lg:flex lg:basis-[0%] lg:flex-col lg:items-stretch">
              <BackButton />
            </div>
          </div>
        )}
      </div>

      <div className={` hidden md:block`}>
        <TopBar menus={topbarNavMenus} pathName={pathname} />
      </div>

      <div>
        {pathname === "/" ||
        pathname === "/tracks" ||
        pathname === "/fundamentals" ? (
          <div className="inline-flex items-center gap-5">
            {/* <ThemeToggleButton hidden={pathname !== "/" && isConnected ? false : true} /> */}
            <Link
              href={"/myProfile"}
              className=" font-medium text-white underline "
            >
              My Profile
            </Link>
            <ConnectButton />
          </div>
        ) : (
          <>
            <BackButton className="lg:hidden" />
            <div className="hidden gap-2 lg:inline-flex">
              {/* <ThemeToggleButton hidden={pathname !== "/" && isConnected ? false : true} /> */}

              <ConnectButton />
            </div>
          </>
        )}
      </div>
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
          <ConnectButton />
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
