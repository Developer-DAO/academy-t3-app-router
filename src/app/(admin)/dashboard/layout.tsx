import "../admin.css";
import Navbar from "@/app/(admin)/dashboard/_components/Navbar";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const navMenus: any[] = [
  {
    title: "Tracks",
    href: "/dashboard",
    // icon: "vector",
  },
  {
    title: "Lessons",
    href: "/dashboard/lessons",
    // icon: "clarity_blocks",
  },
  {
    title: "Tags",
    href: "/dashboard/tags",
    // icon: "",
  },
  {
    title: "Contributors",
    href: "/dashboard/contributors",
    // icon: "",
  },
];

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar navItems={navMenus} />
        <div className="flex h-screen">
          <main className="w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
