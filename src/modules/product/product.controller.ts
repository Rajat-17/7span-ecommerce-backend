import { Request, Response } from "express";
import * as productService from "./product.service";
import { successResponse } from "../../handler/response.handler";
import { errorHandler } from "../../handler/error.handler";

export const createProduct = async (req: Request, res: Response) => {
  console.log("req.body: ", JSON.stringify(req.body))
  try {
    const result = await productService.createProduct(req.body);
    console.log("result: ", JSON.stringify(result))
    return successResponse(res, result, "Product added succefully.");
  } catch (err) {
    console.log("Error on product creation: ", JSON.stringify(err))
    return errorHandler(err, res)
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    console.log("req.body: ", req.body)
    const result = await productService.getProducts(req.body);
    return successResponse(res, result, "Product fetched succefully.");
  } catch (err) {
    console.log("Error on fetching products: ", JSON.stringify(err))
    return errorHandler(err, res)
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const result = await productService.updateProduct(
      Number(req.params.id),
      req.body
    );
    return successResponse(res, result, "Product updated succefully.");
  } catch (err) {
    console.log("Error on updating product: ", JSON.stringify(err))
    return errorHandler(err, res)
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const result = await productService.deleteProduct(
      Number(req.params.id)
    );
    return successResponse(res, result, "Product deleted succefully.");
  } catch (err) {
    console.log("Error on deleting product: ", JSON.stringify(err))
    return errorHandler(err, res)
  }
};