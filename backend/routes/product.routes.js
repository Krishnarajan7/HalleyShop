import express from "express";
import multer from "multer";
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

import { protect, adminOnly } from "../middleware/auth.middleware.js"; 

const router = express.Router();

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });


// Create Product (Admin Only)
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"), 
  validateProductData,
  createProduct
);

// Get All Products
router.get("/", getProducts);

// Get Single Product by ID
router.get("/:id", validateProductId, checkProductExists, getProductById);

// Update Product (Admin Only)
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("image"), 
  validateProductId,
  checkProductExists,
  validateProductData,
  updateProduct
);

// Delete Product (Admin Only)
router.delete(
  "/:id",
  protect,
  adminOnly,
  validateProductId,
  checkProductExists,
  deleteProduct
);

export default router;
