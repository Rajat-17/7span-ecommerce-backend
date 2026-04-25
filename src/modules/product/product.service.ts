import { prisma } from "../../config/db";
import { AppError } from "../../handler/error.handler";

export const createProduct = async (data: any) => {
  const { categoryId } = data;
  const category = await prisma.category.findUnique({
    where: { id: Number(categoryId) }
  });

  if (!category) {
    throw new AppError("Invalid categoryId: Category not found", 400);
  }
  return prisma.product.create({
    data: {
      ...data,
      categoryId: Number(categoryId)
    }
  });
};

export const getProducts = async (query: any) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const search = query.search || "";
  const categoryId = query.categoryId;

  const skip = (page - 1) * limit;

  const where: any = {};

  if (search) {
    where.name = {
      contains: search,
      mode: "insensitive"
    };
  }

  if (categoryId) {
    where.categoryId = Number(categoryId);
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        }
      }
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
  const { categoryId } = data;
  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  const category = await prisma.category.findUnique({
    where: { id: Number(categoryId) }
  });

  if (!category) {
    throw new AppError("Invalid categoryId: Category not found", 400);
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