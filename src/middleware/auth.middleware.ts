// auth.middleware.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../handler/error.handler";
import { prisma } from "../config/db";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError("Forbidden: Access denied", 403);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    console.log("Decoded token:", decoded);
    // @ts-expect-error
    req.user = null;
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    console.log("Found user:", user);
    // @ts-expect-error
    req.user = user;
    return next();
  } catch (err) {
    throw new AppError("Invalid or expired token", 401);
  }
};
