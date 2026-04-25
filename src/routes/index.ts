import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import cartRoutes from "../modules/cart/cart.routes";
import productRoutes from "../modules/product/product.routes";


const router = Router();

router.use("/auth", authRoutes);
router.use("/cart", cartRoutes);
router.use("/product", productRoutes);

export default router;