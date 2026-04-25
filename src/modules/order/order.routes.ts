import { Router } from "express";
import * as controller from "./order.controller";
import { auth } from "../../middleware/auth.middleware";

const router = Router();

router.use(auth);

router.post("/", controller.createOrder);
router.get("/", controller.getOrderHistory);

export default router;