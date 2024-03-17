import { NEXTAUTH_OPTIONS } from "@/app/api/auth/[...nextauth]/nextauth";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

export async function CheckAuth() {
  const session = await getServerSession(NEXTAUTH_OPTIONS);
  // console.log("session", session);
  if (!session) {
    return redirect("/login");
  }
  return null;
}
