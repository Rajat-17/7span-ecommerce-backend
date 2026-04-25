import { prisma } from "../../config/db";
import { AppError } from "../../handler/error.handler";

export const addToCart = async (userId: number, data: any) => {
  const { productId, quantity } = data;
  
  if (quantity <= 0) {
    throw new AppError("Quantity must be greater than 0", 400);
  }

  const product = await prisma.product.findUnique({
    where: { id: Number(productId) }
  });

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  const existing = await prisma.cartItem.findUnique({
    where: {
      userId_productId: {
        userId,
        productId: Number(productId)
      }
    }
  });

  const totalQuantity = existing
    ? existing.quantity + quantity
    : quantity;

  if (totalQuantity > product.stock) {
    throw new AppError(
      `Only ${product.stock} items available in stock`,
      400
    );
  }

  if (existing) {
    return prisma.cartItem.update({
      where: { id: existing.id },
      data: {
        quantity: totalQuantity
      }
    });
  }

  return prisma.cartItem.create({
    data: {
      userId,
      productId: Number(productId),
      quantity
    }
  });
};

export const updateCartItem = async (
  userId: number,
  productId: number,
  quantity: number
) => {
  if (quantity <= 0) {
    throw new AppError("Quantity must be greater than 0", 400);
  }

  const item = await prisma.cartItem.findUnique({
    where: {
      userId_productId: { userId, productId }
    }
  });

  if (!item) {
    throw new AppError("Cart item not found", 404);
  }

  const product = await prisma.product.findUnique({
    where: { id: productId }
  });

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  if (quantity > product.stock) {
    throw new AppError(
      `Only ${product.stock} items available in stock`,
      400
    );
  }

  return prisma.cartItem.update({
    where: { id: item.id },
    data: { quantity }
  });
};

export const removeCartItem = async (
  userId: number,
  productId: number
) => {
  const item = await prisma.cartItem.findUnique({
    where: {
      userId_productId: { userId, productId }
    }
  });

  if (!item) {
    throw new AppError("Cart item not found", 404);
  }

  await prisma.cartItem.delete({
    where: { id: item.id }
  });

  return { message: "Item removed from cart" };
};

export const getCart = async (userId: number) => {
  const items = await prisma.cartItem.findMany({
    where: { userId }
  });

  const productIds = items.map((i) => i.productId);

  const products = await prisma.product.findMany({
    where: { id: { in: productIds } }
  });

  const productMap = new Map<number, any>();
  products.forEach((p) => productMap.set(p.id, p));

  let total = 0;

  const cartItems = items.map((item) => {
    const product = productMap.get(item.productId);
    const price = product?.price ?? 0;
    const name = product?.name ?? "Unknown Product";

    const itemTotal = item.quantity * price;
    total += itemTotal;

    return {
      productId: item.productId,
      name,
      price,
      quantity: item.quantity,
      itemTotal
    };
  });

  return {
    items: cartItems,
    total
  };
};