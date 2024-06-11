"use server";

import { env } from "@/env";
import { createThirdwebClient } from "thirdweb";

const clientId = env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
const secretKey = env.THIRDWEB_SECRET_KEY;

export const thirdwebClient = createThirdwebClient(
  secretKey
    ? { secretKey }
    : {
        clientId,
      },
);
