"use client";

import { env } from "@/env";
import ErrorPage from "next/error";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";

const adminWallets = env.NEXT_PUBLIC_ADMIN_WALLETS.split(", ");

// Middleware function to check if user is authorized
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withAuth = (WrappedComponent: React.FC<any>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const WithAuth: React.FC<any> = (props) => {
    const pathname = usePathname();
    const { address: connectedAddress } = useAccount();

    if (!connectedAddress) {
      return <ErrorPage statusCode={404} />;
    }
    if (
      !adminWallets.includes(connectedAddress) &&
      pathname.startsWith("/admin/")
    ) {
      return <ErrorPage statusCode={404} />;
    }
    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};
