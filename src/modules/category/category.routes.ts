import { Router } from "express";
import { getCategories } from "./category.controller";
import { auth } from "../../middleware/auth.middleware";

const router = Router();

router.get("/", auth, getCategories);

export default router;