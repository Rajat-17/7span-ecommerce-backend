// auth.middleware.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../handler/error.handler";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError("Forbidden: Access denied", 403);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  console.log("Decoded token:", decoded);
  // req.user = decoded;

  next();
};
