import { prisma } from "../../config/db";
import { AppError } from "../../handler/error.handler";

export const placeOrder = async (userId: number) => {
  return prisma.$transaction(async (tx) => {
    // Get cart items
    const cartItems = await tx.cartItem.findMany({
      where: { userId },
      include: { product: true }
    });

    if (!cartItems.length) {
      throw new AppError("Cart is empty", 400);
    }

    // Validate stock
    for (const item of cartItems) {
      if (item.product.stock < item.quantity) {
        throw new AppError(
          `Insufficient stock for ${item.product.name}`,
          400
        );
      }
    }

    // Calculate total
    let totalAmount = 0;

    cartItems.forEach((item) => {
      totalAmount += item.quantity * item.product.price;
    });

    // Create Order
    const order = await tx.order.create({
      data: {
        userId,
        totalAmount,
        status: "confirmed"
      }
    });

    // Create Order Items
    const orderItemsData = cartItems.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.product.price
    }));

    await tx.orderItem.createMany({
      data: orderItemsData
    });

    // Deduct stock
    for (const item of cartItems) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      });
    }

    // Clear cart
    await tx.cartItem.deleteMany({
      where: { userId }
    });

    return order;
  });
};

export const getOrders = async (userId: number) => {
  return prisma.order.findMany({
    where: { userId },
    include: {
      OrderItem: {
        include: {
          product: {
            select: { name: true }
          }
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};