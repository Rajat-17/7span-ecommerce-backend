import { Request, Response } from "express";
import { successResponse } from "../../handler/response.handler";
import * as categoryService from "./category.service";
import { errorHandler } from "../../handler/error.handler";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const data = await categoryService.getCategories();
    return successResponse(res, data);
  } catch (err) {
      console.log("Error: ", JSON.stringify(err))
      return errorHandler(err, res)
  }
};