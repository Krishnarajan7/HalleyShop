import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import {
  validateProductId,
  checkProductExists,
  validateProductData,
} from "../middleware/product.middleware.js";

const router = express.Router();

router.post("/", validateProductData, createProduct);
router.get("/", getProducts);
router.get("/:id", validateProductId, checkProductExists, getProductById);
router.put("/:id", validateProductId, checkProductExists, validateProductData, updateProduct);
router.delete("/:id", validateProductId, checkProductExists, deleteProduct);

export default router;
