"use client";

import { ConnectButton } from "thirdweb/react";
import { thirdwebClient } from "@/lib/thirdwebClient";
import { isLoggedIn, login, generatePayload, logout } from "@/app/actions/auth";
import { createWallet, inAppWallet } from "thirdweb/wallets";

const wallets = [
  createWallet("io.metamask"),
  inAppWallet({
    auth: {
      options: ["email", "google", "apple", "facebook"],
    },
  }),
  createWallet("io.zerion.wallet"),
];

export default function ConnectWallet() {
  return (
    <ConnectButton
      client={thirdwebClient}
      wallets={wallets}
      auth={{
        isLoggedIn: async (address) => {
          console.log("checking if logged in!", { address });
          return await isLoggedIn();
        },
        doLogin: async (params) => {
          console.log("logging in!");
          await login(params);
        },
        getLoginPayload: async ({ address }) => generatePayload({ address }),
        doLogout: async () => {
          console.log("logging out!");
          await logout();
        },
      }}
      connectModal={{ size: "wide" }}
    />
  );
}
