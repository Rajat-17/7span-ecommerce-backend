import { Request, Response } from "express";
import { placeOrder, getOrders } from "./order.service";
import { successResponse } from "../../handler/response.handler";
import { errorHandler } from "../../handler/error.handler";

export const createOrder = async (req: Request, res: Response) => {
  try {
    // @ts-expect-error - user is added to req in auth middleware
    const userId = req.user.id;

    const order = await placeOrder(userId);

    return successResponse(res, order, "Order placed successfully", 201);
  } catch (err) {
    return errorHandler(err, res);
  }
};

export const getOrderHistory = async (req: Request, res: Response) => {
  try {
    // @ts-expect-error - user is added to req in auth middleware
    const userId = req.user.id;

    const orders = await getOrders(userId);

    return successResponse(res, orders);
  } catch (err) {
    return errorHandler(err, res);
  }
};