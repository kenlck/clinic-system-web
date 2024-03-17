import { prisma } from "@/lib/db.server";
import { compareSync, hash } from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { env } from "@/env.mjs";
import { NEXTAUTH_OPTIONS } from "./nextauth";

const handler = NextAuth(NEXTAUTH_OPTIONS);

export { handler as GET, handler as POST };
