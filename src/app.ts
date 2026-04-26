// src/app.ts
import express from "express";
import cors from "cors";
import mainRoutes from "./routes";
import { errorHandler } from "./handler/error.handler";


const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log("REQUEST HIT:", req.method, req.url);
  next();
});
app.use("/api", mainRoutes);
app.use(errorHandler);

export default app;