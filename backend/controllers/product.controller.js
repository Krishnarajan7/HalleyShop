import { PrismaClient } from "@prisma/client";
import cloudinary from "../config/cloudinary.js";

const prisma = new PrismaClient();

// CREATE Product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, brand, stock, tags, imageUrl } =
      req.body;

    let uploadedImageUrl = imageUrl || null;
    let imagePublicId = null;

    // If image file is uploaded, upload to Cloudinary
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      uploadedImageUrl = uploadResult.secure_url;
      imagePublicId = uploadResult.public_id;
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        brand,
        stock: parseInt(stock),
        imageUrl: uploadedImageUrl,
        imagePublicId,
        tags: tags ? JSON.parse(tags) : [],
      },
    });

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res
      .status(500)
      .json({ message: "Failed to create product", error: error.message });
  }
};

// GET ALL Products (pagination, search, sorting)
export const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      search = "",
      category = "all",
      status = "all",
      priceRange = "all",
      brand = "all",
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(pageSize);
    const take = parseInt(pageSize);
    const where = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (category !== "all") {
      where.category = category;
    }

    if (brand !== "all") {
      where.brand = brand;
    }

    if (status === "available") {
      where.stock = { gt: 0 };
    } else if (status === "out-of-stock") {
      where.stock = { equals: 0 };
    }

    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-");
      if (max) {
        where.price = {
          gte: parseFloat(min),
          lte: parseFloat(max),
        };
      } else if (priceRange === "500+") {
        where.price = { gte: 500 };
      }
    }

    const [products, totalItems] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take,
        orderBy: {
          [sortBy]: order,
        },
      }),
      prisma.product.count({ where }),
    ]);

    const totalPages = Math.ceil(totalItems / take);
    const productsWithStatus = products.map((product) => ({
      ...product,
      status: product.stock > 0 ? "available" : "out-of-stock",
    }));

    res.json({
      success: true,
      data: {
        products: productsWithStatus,
        totalItems,
        totalPages,
        currentPage: parseInt(page),
      },
    });

    res.json({
      success: true,
      data: {
        products,
        totalItems,
        totalPages,
        currentPage: parseInt(page),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// GET ONE Product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.productId },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
};

// UPDATE Product

export const updateProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const existing = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existing) {
      return res.status(404).json({ error: "Product not found" });
    }

    const { name, description, price, category, brand, stock, tags } = req.body;

    let updatedData = {
      name,
      description,
      price: price ? parseFloat(price) : existing.price,
      category,
      brand,
      stock: stock ? parseInt(stock) : existing.stock,
      tags: tags ? JSON.parse(tags) : existing.tags,
    };

    // If a new image is uploaded
    if (req.file) {
      // Delete old image from Cloudinary if exists
      if (existing.imagePublicId) {
        await cloudinary.uploader.destroy(existing.imagePublicId);
      }

      // Upload new image
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      updatedData.imageUrl = uploadResult.secure_url;
      updatedData.imagePublicId = uploadResult.public_id;
    }

    const updated = await prisma.product.update({
      where: { id: productId },
      data: updatedData,
    });

    res.json({ message: "Product updated successfully", product: updated });
  } catch (err) {
    res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
};

// DELETE Product
export const deleteProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const existing = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existing) {
      return res.status(404).json({ error: "Product not found" });
    }
    if (existing.imagePublicId) {
      await cloudinary.uploader.destroy(existing.imagePublicId);
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
};
