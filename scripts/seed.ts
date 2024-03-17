import { prisma } from "@/lib/db.server";
import { hash } from "bcryptjs";

async function loadInitialUsers() {
  const users = await prisma.user.findMany();
  if (users.length === 0) {
    const hashedPassword = await hash("pppppppp", 10);
    await prisma.user.create({
      data: {
        email: "user@user.com",
        password: hashedPassword,
      },
    });
  }
  console.log(users);
}

console.log("Loading initial users...");
await loadInitialUsers();
