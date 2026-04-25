import { Router } from "express";
import * as controller from "./cart.controller";
import { auth } from "../../middleware/auth.middleware";

const router = Router();

router.use(auth);

router.post("/add", controller.addToCart);
router.put("/:productId", controller.updateCart);
router.delete("/:productId", controller.removeCart);
router.get("/", controller.getCart);

export default router;