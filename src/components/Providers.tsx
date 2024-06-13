"use client";

import { TRPCReactProvider } from "@/trpc/react";

import { MDXProvider } from "@mdx-js/react";
import Components from "@/components/mdx/Components";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/wagmi";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

export default function Providers({ children }: Props) {
  return (
    <MDXProvider components={Components}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitSiweNextAuthProvider>
            <RainbowKitProvider>
              <TRPCReactProvider>{children}</TRPCReactProvider>
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </MDXProvider>
  );
}
