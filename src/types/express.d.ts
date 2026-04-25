// src/types/express.d.ts

export {}; // 👈 IMPORTANT (makes it a module)

declare global {
  namespace Express {
    interface UserPayload {
      id: number;
      role: string;
    }

    interface Request {
      user?: UserPayload;
    }
  }
}