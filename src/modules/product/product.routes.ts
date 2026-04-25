import { Router } from "express";
import * as controller from "./product.controller";
import { auth } from "../../middleware/auth.middleware";
import { authorizeRoles } from "../../middleware/role.middleware";
import { validate } from "../../middleware/validation.middleware";
import { createProductSchema } from "./product.validation";

const router = Router();

// Public
router.post("/list", controller.getProducts);

// Admin only
router.post("/create", validate(createProductSchema), controller.createProduct);
router.put("/:id", auth, authorizeRoles("admin"), controller.updateProduct);
router.delete("/:id", auth, authorizeRoles("admin"), controller.deleteProduct);

export default router;