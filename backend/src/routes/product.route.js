import { Router } from "express";
import {
  getAllProducts,
  getAllProductsAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = Router();

// Public route
router.route("/").get(getAllProducts);

// Admin routes
router.route("/admin").get(getAllProductsAdmin).post(createProduct);
router.route("/admin/:id").put(updateProduct).delete(deleteProduct);

export default router;
