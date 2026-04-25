import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../../config/db";
import { AppError } from "../../handler/error.handler";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const login = async (email: string, password: string) => {
  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.email
    },
    JWT_SECRET,
    {
      expiresIn: "1d"
    }
  );

  const { password: _, ...safeUser } = user;

  return {
    token,
    user: safeUser
  };
};