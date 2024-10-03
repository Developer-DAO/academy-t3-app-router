import NextLink from "next/link";
import type { FC } from "react";

import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { Icons } from "./Icons";

interface SubNavItem {
  name: string;
  href: string;
}

interface NavItem {
  name: string;
  icon?: string;
  href: string;
  subnavs?: SubNavItem[];
}

export interface SideBarProps {
  menus: Omit<NavItem, "subnavs" | "icon">[];
}

const SideBar: FC<SideBarProps> = ({ menus }) => {
  return (
    <Sheet>
      <SheetTrigger asChild className="text-[#44AF96]">
        <Icons.hamburger_menu className="h-8 w-auto max-w-8" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-full bg-black pt-12 text-white md:max-w-sm"
      >
        <div className="gap-4 pt-12">
          {menus.map((menu, key) => (
            <div key={key} className={`mobile-nav-item font-deathstar`}>
              <SheetClose asChild>
                <NextLink href={menu.href}>{menu.name}</NextLink>
              </SheetClose>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { SideBar };
