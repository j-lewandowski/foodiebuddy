import NextAuth, { NextAuthOptions, User } from "next-auth";
import db from "@/utils/prisma";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
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
        await db.user.create({
          data: {
            email: user.email!,
            name: user.name!,
          },
        });
        return true;
      } catch (error) {
        return "/error";
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
