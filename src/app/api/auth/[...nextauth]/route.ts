import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import prisma from "../../../../../lib/prisma";

import bcrpyt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
export const authOption: NextAuthOptions = {
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
          where: { email: credentials?.email },
        });

        if (user) {
          return bcrpyt.compareSync(credentials!.password, user.password!)
            ? {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
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
    jwt: async ({ token, user }: any) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }: any) => {
      session.user = token.user;
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

// async function auth(req: NextApiRequest, res: NextApiResponse) {
//   // Do whatever you want here, before the request is passed down to `NextAuth`
//   return await NextAuth(req, res, authOption);
// }

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
