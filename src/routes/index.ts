import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import cartRoutes from "../modules/cart/cart.routes";
import productRoutes from "../modules/product/product.routes";
import orderRoutes from "../modules/order/order.routes";


const router = Router();

router.use("/auth", authRoutes);
router.use("/cart", cartRoutes);
router.use("/product", productRoutes);
router.use("/order", orderRoutes);

export default router;