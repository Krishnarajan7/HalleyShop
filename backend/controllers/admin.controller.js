import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";
import { Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// List customers with search and filter
export const listCustomers = async (req, res) => {
  try {
    let { search = "", status = "all", page = 1, limit = 10 } = req.query;
    status = status?.toLowerCase();
    page = parseInt(page);
    limit = parseInt(limit);

    const where = {
      role: "customer",
      ...(status === "active"
        ? { status: "Active" }
        : status === "inactive"
        ? { status: "Blocked" }
        : {}),
      ...(search && {
        OR: [
          { firstName: { contains: search, mode: "insensitive" } },
          { lastName: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    const [customers, total] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      customers,
      pagination: {
        page,
        total,
        totalPages,
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Create customer (admin only)
export const createCustomer = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const customer = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashed,
        role: "customer",
        status: "Active",
      },
    });

    res.status(201).json({ customer });
  } catch (err) {
    console.error("Create customer error:", err);

    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002" &&
      err.meta?.target?.includes("email")
    ) {
      return res.status(409).json({ message: "Email already exists" });
    }

    res.status(500).json({ message: "Failed to create customer" });
  }
};

// Update customer profile
export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, status } = req.body;
    const customer = await prisma.user.update({
      where: { id },
      data: { firstName, lastName, email, status },
    });
    res.status(200).json({ customer });
  } catch (err) {
    console.error("Update customer error:", err);
    res.status(500).json({ message: "Failed to update customer" });
  }
};

// Block a customer
export const blockCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await prisma.user.update({
      where: { id },
      data: { status: "Blocked" },
    });
    res.status(200).json({ message: "Customer blocked", customer });
  } catch (err) {
    console.error("Block customer error:", err);
    res.status(500).json({ message: "Failed to block customer" });
  }
};

// Unblock a customer
export const unblockCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await prisma.user.update({
      where: { id },
      data: { status: "Active" },
    });
    res.status(200).json({ message: "Customer unblocked", customer });
  } catch (err) {
    console.error("Unblock customer error:", err);
    res.status(500).json({ message: "Failed to unblock customer" });
  }
};

// Delete a customer
export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: "Customer deleted" });
  } catch (err) {
    console.error("Delete customer error:", err);
    res.status(500).json({ message: "Failed to delete customer" });
  }
};

// Reset customer password
export const resetCustomerPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashed = await bcrypt.hash(tempPassword, 10);
    await prisma.user.update({ where: { id }, data: { password: hashed } });
    // You can send or display tempPassword as needed
    res.status(200).json({ tempPassword });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Failed to reset password" });
  }
};

// Enable/disable portal
export const setPortalAccess = async (req, res) => {
  try {
    const { id } = req.params;
    const { enable } = req.body;
    const customer = await prisma.user.update({
      where: { id },
      data: { enablePortal: enable },
    });
    res.status(200).json({ customer });
  } catch (err) {
    console.error("Set portal access error:", err);
    res.status(500).json({ message: "Failed to set portal access" });
  }
};

// Get customer with order history
export const getCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        orders: true, 
      },
    });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ customer });
  } catch (err) {
    console.error("Get customer error:", err);
    res.status(500).json({ message: "Failed to get customer" });
  }
};

// Impersonate customer
export const impersonateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await prisma.user.findUnique({ where: { id } });
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });
    const token = generateToken(customer); // You must have this utility
    res.status(200).json({ token });
  } catch (err) {
    console.error("Impersonate error:", err);
    res.status(500).json({ message: "Failed to impersonate customer" });
  }
};
