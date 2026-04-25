import { Request, Response, NextFunction } from "express";
import { AppError } from "../handler/error.handler";

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("Authorizing roles:", roles);
    console.log("User from request:", req.headers);

    const user = null;

    // if (!user || !user.role || !roles.includes(user.role)) {
    //   throw new AppError("Unauthorized: Access denied", 401);
    // }

    next();
  };
};