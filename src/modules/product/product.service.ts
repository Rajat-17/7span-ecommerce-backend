import { prisma } from "../../config/db";
import { AppError } from "../../handler/error.handler";

export const createProduct = async (data: any) => {
  const { name, price, stock } = data;

  if (!name || price == null || stock == null) {
    throw new AppError("Missing required fields", 400);
  }

  return prisma.product.create({
    data
  });
};

// GET with pagination + search
export const getProducts = async (query: any) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const search = query.search || "";

  const skip = (page - 1) * limit;

  const where = search
    ? {
        name: {
          contains: search,
          mode: "insensitive"
        }
      }
    : {};

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" }
    }),
    prisma.product.count({ where })
  ]);

  return {
    products,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  };
};

export const updateProduct = async (id: number, data: any) => {
  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  return prisma.product.update({
    where: { id },
    data
  });
};

export const deleteProduct = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  await prisma.product.delete({
    where: { id }
  });

  return { message: "Product deleted" };
};