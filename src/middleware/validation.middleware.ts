import { NextFunction, Request, Response } from "express";

export const validate = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, {
        abortEarly: false // show all errors
      });
      next();
    } catch (err: any) {
      const errors = err.errors || ["Validation failed"];

      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors
      });
    }
  };
};