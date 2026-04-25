import { Request, Response } from "express";
import * as cartService from "./cart.service";
import { successResponse } from "../../handler/response.handler";
import { errorHandler } from "../../handler/error.handler";

export const addToCart = async (req: Request, res: Response) => {
  try {
    // @ts-expect-error
    const userId = req.user.id;

    const result = await cartService.addToCart(userId, req.body);
    return successResponse(res, result, "Added to cart");
  } catch (err) {
    return errorHandler(err, res);
  }
};

export const updateCart = async (req: Request, res: Response) => {
  try {
    // @ts-expect-error
    const userId = req.user.id;

    const result = await cartService.updateCartItem(
      userId,
      Number(req.params.productId),
      req.body.quantity
    );

    return successResponse(res, result, "Cart updated");
  } catch (err) {
    return errorHandler(err, res);
  }
};

export const removeCart = async (req: Request, res: Response) => {
  try {
    // @ts-expect-error
    const userId = req.user.id;

    const result = await cartService.removeCartItem(
      userId,
      Number(req.params.productId)
    );

    return successResponse(res, result);
  } catch (err) {
    return errorHandler(err, res);
  }
};

export const getCart = async (req: Request, res: Response) => {
  try {
    // @ts-expect-error
    const userId = req.user.id;

    const result = await cartService.getCart(userId);
    return successResponse(res, result);
  } catch (err) {
    return errorHandler(err, res);
  }
};