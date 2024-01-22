import NextAuth, { NextAuthOptions } from "next-auth";

import Google from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.NEXT_AUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_AUTH_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn(params) {
      if (params.account!.provider === "google") {
        try {
          await fetch(`${process.env.API_BASE_URL}`, {
            method: "POST",
            body: JSON.stringify(params.user!),
            headers: { "Content-Type": "application/json" },
          });
          return true;
        } catch (error) {
          throw new Error("Something went wrong");
        }
      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
