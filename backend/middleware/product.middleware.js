import { PrismaClient } from "@prisma/client";
import { productSchema, partialProductSchema } from "../validation/product.validation.js";

const prisma = new PrismaClient();

// Validate product ID from route param
export const validateProductId = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id) || id <= 0) {
    console.log("Product middleware: Invalid product ID:", req.params.id);
    return res.status(400).json({ error: "Invalid product ID" });
  }

  req.productId = id;
  next();
};

// Check if product exists in DB
export const checkProductExists = async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.productId },
    });

    if (!product) {
      console.log("Product middleware: Product not found with ID:", req.productId);
      return res.status(404).json({ error: "Product not found" });
    }

    req.product = product;
    next();
  } catch (err) {
    console.error("Product middleware error:", err.message);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Validate product data for POST and PUT
export const validateProductData = (req, res, next) => {
  try {
    const isUpdate = req.method === "PUT" || req.method === "PATCH";
    const schema = isUpdate ? partialProductSchema : productSchema;

    // Preprocess req.body fields
    const processedBody = {
      ...req.body,
      price: req.body.price ? parseFloat(req.body.price) : undefined,
      stock: req.body.stock ? parseInt(req.body.stock) : undefined,
      tags: req.body.tags ? JSON.parse(req.body.tags) : [],
    };

    const result = schema.safeParse(processedBody);

    if (!result.success) {
      const message = result.error.errors[0].message;
      console.log("Product middleware: Validation error:", message);
      return res.status(400).json({ error: message });
    }

    req.validatedBody = result.data;
    next();
  } catch (err) {
    console.error("Product middleware error:", err.message);
    return res.status(400).json({ error: "Invalid product data format" });
  }
};

