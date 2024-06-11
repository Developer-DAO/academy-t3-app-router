"use client";

import { TRPCReactProvider } from "@/trpc/react";

import { MDXProvider } from "@mdx-js/react";
import Components from "@/components/mdx/Components";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <MDXProvider components={Components}>
      <TRPCReactProvider>{children}</TRPCReactProvider>
    </MDXProvider>
  );
}
