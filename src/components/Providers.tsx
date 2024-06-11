"use client";

import { TRPCReactProvider } from "@/trpc/react";
import { ThirdwebProvider } from "thirdweb/react";

import { MDXProvider } from "@mdx-js/react";
import Components from "@/components/mdx/Components";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <MDXProvider components={Components}>
      <ThirdwebProvider>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </ThirdwebProvider>
    </MDXProvider>
  );
}
