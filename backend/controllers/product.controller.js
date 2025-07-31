import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ CREATE Product
export const createProduct = async (req, res) => {
  try {
    const product = await prisma.product.create({
      data: req.validatedBody, // Set by validateProductData middleware
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
};

// ✅ GET ALL Products (pagination, search, sorting)
export const getProducts = async (req, res) => {
  const {
    page = 1,
    search = "",
    sortBy = "createdAt",
    order = "desc",
  } = req.query;

  const pageSize = 20;
  const skip = (Number(page) - 1) * pageSize;

  try {
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        orderBy: { [sortBy]: order },
        skip,
        take: pageSize,
      }),
      prisma.product.count({
        where: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      }),
    ]);

    res.json({
      data: {
        products,
        totalItems: total,
        totalPages: Math.ceil(total / pageSize),
        currentPage: Number(page),
      },
    });
  } catch (err) {
    res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
};

// ✅ GET ONE Product by ID
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
    const updatedData = req.validatedBody;

    const existing = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existing) {
      return res.status(404).json({ error: "Product not found" });
    }

    const updated = await prisma.product.update({
      where: { id: productId },
      data: updatedData,
    });

    res.json(updated);
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
