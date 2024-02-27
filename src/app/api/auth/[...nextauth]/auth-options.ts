import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../../../lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import bcrpyt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Address } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "people@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: { email: credentials!.email },
          include: {
            addresses: true,
            groups: {
              include: {
                permissions: {
                  include: {
                    entity: true,
                  },
                },
              },
            },
            permissionRoles: {
              include: {
                permissions: {
                  include: { entity: true },
                },
              },
            },
          },
        });

        if (user) {
          return bcrpyt.compareSync(credentials!.password, user.password!)
            ? {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                addresses: user.addresses,
                groups: user.groups,
                permissionRoles: user.permissionRoles,
                selectedAddress: user?.addresses.filter(
                  (add: Address) => add?.default,
                )[0],
                storeAccesses: user.storeAccesses,
              }
            : null;
        }
        return null;
      },
    }),
  ],
  secret: "asdfasdf",
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  }, // 30 days},
  // pages: { signIn: "/admin/login" },
  callbacks: {
    jwt: async ({ token, user, trigger, session }: any) => {
      user && (token.user = user);

      // trigger when user changes their selected address
      if (trigger === "update" && session?.selectedAddress) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.user.selectedAddress = session.selectedAddress;
      }

      if (
        trigger === "update" &&
        session?.isDeleteCall &&
        token?.user.selectedAddress?.id === session?.id
      ) {
        token.user.selectedAddress = null;
      }

      if (trigger === "update" && session?.isUpdateDefault) {
        token.user.selectedAddress.default = session?.val;
        token.user.addresses = token.user.addresses.map((add: any) =>
          add.id === session?.selectedAddressId
            ? { ...add, default: session?.val }
            : add,
        );
      }

      return token;
    },
    session: async ({ session, token }: any) => {
      session.user = token.user;
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: { addresses: true },
      });
      session.user.id = user?.id;
      session.user.addresses = user?.addresses;

      session.user.selectedAddress = session.user.selectedAddress
        ? session.user.selectedAddress
        : user?.addresses.filter((add: Address) => add?.default)[0];

      return session;
    },

    // redirect: async (url, baseUrl) => {
    //   if (url.con)
    // },
    // async signIn() {
    //   return true;
    // },

    // signIn: async ({
    //   account,
    //   profile,
    // }: {
    //   account: Account;
    //   profile: GoogleProfile;
    // }) => {
    //   // const maybeUser = await prisma.user.findUnique({
    //   //   where: { email: profile.email },
    //   // });
    //   // if (!maybeUser) {
    //   //   const new_user = await prisma.user.create({
    //   //     data: { name: profile.name, email: profile.email },
    //   //   });
    //   //   return new_user;
    //   // }
    //   // return maybeUser;
    //   console.log(account, profile);

    //   if (account.provider === "google") {
    //     const maybeUser = await prisma.user.findUnique({
    //       where: { email: profile.email },
    //     });
    //     if (!maybeUser) {
    //       const new_user = await prisma.user.create({
    //         data: { name: profile.name, email: profile.email },
    //       });
    //       return new_user;
    //     }
    //     // return profile.email_verified && profile.email.endsWith("@gmail.com");
    //     return true;
    //   }
    //   return true; // Do different verification for other providers that don't have `email_verified`
    // },
  },
};
