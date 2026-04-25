import { prisma } from "../../config/db";

export const getCategories = async () => {
  return prisma.category.findMany({
    orderBy: { id: "asc" },
  });
};
