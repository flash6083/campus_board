/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_GOOGLE_ID_QUERY } from "@/sanity/lib/queries";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    callbacks: {
    async signIn({ user, profile }: { user: { name?: string | null; email?: string | null; image?: string | null }, profile?: { sub?: string | null } }) {
      const name = user.name ?? "Unknown";
      const email = user.email ?? "unknown@example.com";
      const image = user.image ?? "";
      if (!profile) return false;

      const googleId = profile.sub;

      const existingUser = await client.fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
        id: googleId,
      });

      if (!existingUser) {
        const username = email?.split("@")[0] || name?.toLowerCase().replace(/\s/g, "") || "user";
        await writeClient.create({
          _type: "author",
          id: googleId,
          name,
          email,
          image,
          username,
          bio: "New user", // default bio
        });
      }

      return true;
    },

    async jwt({ token, profile }: { token: any; profile?: { sub?: string | null } }) {
      if (profile?.sub) {
        const googleId = profile.sub;
        const user = await client.fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
          id: googleId,
        });

        token.id = user?._id;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      session.user.id = token.id;
      return session;
    },
  },
})