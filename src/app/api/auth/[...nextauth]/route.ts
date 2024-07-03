/* eslint-disable @typescript-eslint/no-unsafe-return */
import NextAuth, { type DefaultSession } from "next-auth";
import type { Session } from "next-auth";

import { env } from "@/env";
import { SiweMessage } from "siwe";
import { getCsrfToken } from "next-auth/react";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/server/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      image: string;
      verificationNumber: number;
      // ...other properties
      // role: UserRole;
      address: string;
    } & DefaultSession["user"];
  }
}

// Auth
const handler = NextAuth({
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      } as Session & { user: { id: string } };
    },
  },
  session: { strategy: "jwt" },
  secret: env.NEXTAUTH_SECRET!, // in case you want pass this along for other functionality
  providers: [
    CredentialsProvider({
      // ! Don't add this
      // - it will assume more than one auth provider
      // - and redirect to a sign-in page meant for oauth
      // - id: 'siwe',
      name: "Ethereum",
      type: "credentials", // default for Credentials
      // Default values if it was a form
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      authorize: async (credentials, req) => {
        try {
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message ?? "{}") as Partial<SiweMessage>,
          );

          // if (req?.headers === undefined) throw new Error("No headers");

          const nonce = await getCsrfToken({
            req: { headers: req?.headers },
          });

          if (nonce === undefined) throw new Error("No nonce");

          const verified = await siwe.verify({
            signature:
              credentials?.signature !== undefined ? credentials.signature : "",
            nonce,
          });

          if (!verified.success) {
            throw new Error("Verification failed");
          }

          const { data: fields } = verified;

          // Check if user exists
          let user = await db.user.findUnique({
            where: {
              address: fields.address,
            },
          });

          // Create new user if doesn't exist
          if (!user) {
            user = await db.user.create({
              data: {
                address: fields.address,
                image: "https://www.developerdao.com/D_D_logo-dark.svg",
                // verificationNumber: Math.floor(100000 + Math.random() * 900000),
              },
            });

            // if new then create account
            await db.account.create({
              data: {
                userId: user.id,
                type: "credentials",
                provider: "Ethereum",
                providerAccountId: fields.address,
              },
            });
          }

          return {
            ...user,
          };
        } catch (error) {
          // Uncomment or add logging if needed
          console.error({ error });
          return null;
        }
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
});

// Exports
// ========================================================
export { handler as GET, handler as POST };
