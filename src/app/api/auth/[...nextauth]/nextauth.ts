// import { auditLog } from "@/lib/audit.server";
import { prisma } from "@/lib/db.server";
// import { AuditAction } from "@prisma/client";
import { compareSync } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { env } from "node:process";

export const NEXTAUTH_OPTIONS: NextAuthOptions = {
  pages: {
    signIn: "/sign_in",
  },
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `strategy` should be set to 'jwt' if no database is used.
    strategy: "jwt",
    maxAge: 24 * 60 * 60 * 7, // 7 days
  },
  jwt: {
    secret: env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 7, // 7 day
  },
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        // token.type = user.type;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token && session.user) {
        session.user.id = token.id as string;
        // session.user.type = token.type as string;
      }

      return session;
    },
  },
  events: {
    signIn: async ({ user }) => {
      // auditLog(AuditAction.USER_LOGIN, Number(user.id), "");
    },
    signOut: async ({ session }) => {
      // auditLog(AuditAction.USER_LOGOUT, Number(session.user.id), "");
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const email = credentials?.email;
        const password = credentials?.password;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          return null;
        }

        const isValid = compareSync(password ?? "", user.password);
        if (!isValid) {
          return null;
        }

        return {
          id: user.id.toString(),
          email: user.email,
          // type: user.userType,
        };
      },
    }),
  ],
};
