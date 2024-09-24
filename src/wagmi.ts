import { env } from "@/env";
import { mainnet /*, optimism, optimismSepolia */ } from "wagmi/chains";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { createConfig, http } from "wagmi";
import { zerionWallet } from "@rainbow-me/rainbowkit/wallets";
import { createClient } from "viem";

const connectors = connectorsForWallets(
  [
    {
      groupName: "D_D Preferred Partner",
      wallets: [zerionWallet],
    },
  ],
  {
    appName: "D_D Academy",
    projectId: env.NEXT_PUBLIC_WALLET_CONNECT_ID,
  },
);

export const config = createConfig({
  chains: [mainnet],
  ssr: true,
  connectors,
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});

// export const config = getDefaulConfig({
//   appName: "D_D Academy",
//   projectId: env.NEXT_PUBLIC_WALLET_CONNECT_ID,
//   chains: [
//     mainnet,
//     // optimism,
//     // ...(env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [optimismSepolia] : []),
//   ],
//   ssr: true,
// });
