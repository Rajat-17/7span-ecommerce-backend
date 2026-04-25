import { Request, Response } from "express";
import { login } from "./auth.service";
import { successResponse } from "../../handler/response.handler";
import { errorHandler } from "../../handler/error.handler";

export const loginUser = async (req: Request, res: Response) => {
  try {
    console.log("Request: ", JSON.stringify(req.body))
    const { email, password } = req.body;

    const result = await login(email, password);

    return successResponse(res, result, "Login successful");
  } catch (err: any) {
    console.log("Error: ", JSON.stringify(err))
    return errorHandler(err, res)
  }
};
