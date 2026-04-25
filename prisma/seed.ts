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

  await prisma.category.createMany({
    data: [
      {
        name: "Personal Care",
        description: "Soap, shampoo, toothpaste, skincare items"
      },
      {
        name: "Groceries",
        description: "Daily food items like rice, flour, oil, spices"
      },
      {
        name: "Household Items",
        description: "Cleaning supplies, detergents, utensils"
      },
      {
        name: "Snacks & Beverages",
        description: "Chips, biscuits, soft drinks, juices"
      },
      {
        name: "Baby Care",
        description: "Diapers, baby soap, baby food products"
      }
    ]
  });

}

main();