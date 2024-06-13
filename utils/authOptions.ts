import db from "@/utils/prisma";
import GoogleProvider from "next-auth/providers/google";

import { NextAuthOptions, User, Session, Awaitable } from "next-auth";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // ...add more providers here
  ],
  pages: { signIn: "/signin" },

  callbacks: {
    async signIn({ user }: { user: User }) {
      const usersCount = await db.user.count({
        where: {
          email: user.email!,
        },
      });

      if (usersCount > 0) {
        return true;
      }
      try {
        const newUser = await db.user.create({
          data: {
            email: user.email!,
            name: user.name!,
          },
        });

        // After user sign up - create personal ranking
        await db.ranking.create({
          data: {
            id: newUser.id,
            authorizedUserId: newUser.id,
          },
        });

        return true;
      } catch (error) {
        console.log(error);
        return "/error";
      }
    },
    async session({ session, token }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email!,
        },
      });
      session.user.userId = dbUser?.id!;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
} satisfies NextAuthOptions;
