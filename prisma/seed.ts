// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("qwerty1234", 10);

  await prisma.user.createMany({
    data: [
      { name: "Admin 7Span", email: "admin@test.com", password: hash, role: "admin" },
      { name: "User 7Span", email: "user@test.com", password: hash, role: "customer" }
    ]
  });
}

main();