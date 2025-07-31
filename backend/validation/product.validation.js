import { z } from "zod";

// Full schema for creating a product
export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be positive"),
  stock: z.number().int().min(0, "Stock must be a non-negative integer"),
  imageUrl: z.string().url("Invalid image URL").optional(),
  category: z.string().min(1, "Category is required"),
  brand: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

// Partial schema for updating a product (fields optional)
export const partialProductSchema = productSchema.partial();
