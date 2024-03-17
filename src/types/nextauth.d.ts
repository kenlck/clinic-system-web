import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
      email: string;
      // type: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    /** The user's postal address. */
    id: string;
    email: string;
    // type: string | null;
  }
}
