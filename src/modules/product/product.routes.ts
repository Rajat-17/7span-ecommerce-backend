import { Router } from "express";
import * as controller from "./product.controller";
import { auth } from "../../middleware/auth.middleware";
import { authorizeRoles } from "../../middleware/role.middleware";

const router = Router();

// Public
router.post("/list", controller.getProducts);

// Admin only
router.post("/create", auth, authorizeRoles("admin"), controller.createProduct);
router.put("/:id", auth, authorizeRoles("admin"), controller.updateProduct);
router.delete("/:id", auth, authorizeRoles("admin"), controller.deleteProduct);

export default router;