import { env } from "@/env";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, optimism, optimismSepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "RainbowKit demo",
  projectId: env.NEXT_PUBLIC_WALLET_CONNECT_ID,
  chains: [
    mainnet,
    optimism,
    ...(env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [optimismSepolia] : []),
  ],
  ssr: true,
});
