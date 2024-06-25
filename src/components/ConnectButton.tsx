"use client";

import { ConnectButton as RainbowkitConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const ConnectButton = () => {
  return (
    <RainbowkitConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        if (!ready) {
          return (
            <Button className={`connect-button font-future`} disabled>
              loading
            </Button>
          );
        }

        return (
          <>
            {connected !== true ? (
              <Button
                onClick={openConnectModal}
                className={`connect-button font-future hover:bg-[var(--button-secondary-dark)]`}
              >
                Connect
              </Button>
            ) : chain?.unsupported === true ? (
              <Button
                onClick={openChainModal}
                className={`connect-button font-future hover:bg-[var(--button-secondary-dark)]`}
              >
                Switch Network
              </Button>
            ) : (
              <button onClick={openAccountModal}>
                <Image
                  src={
                    account?.ensAvatar !== undefined
                      ? account.ensAvatar
                      : "/avatar.png"
                  }
                  alt="account avatar"
                  width={50}
                  height={50}
                  className="border-3 rounded-full border-black object-cover p-0 opacity-80 shadow-sm hover:h-14 hover:w-14 hover:border-amber-400"
                />
              </button>
            )}
          </>
        );
      }}
    </RainbowkitConnectButton.Custom>
  );
};
