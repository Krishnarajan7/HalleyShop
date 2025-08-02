  import express from "express";
  import {
    placeOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
    cancelOrder,
  } from "../controllers/order.controller.js";
  import { protect, adminOnly } from "../middleware/auth.middleware.js";

  const router = express.Router();

  // Customer routes
  router.post("/place", protect, placeOrder);
  router.get("/my", protect, getMyOrders);
  router.get("/:id", protect, getOrderById);
  router.put('/:id/cancel', protect, cancelOrder);

  // Admin routes
  router.get("/", protect, adminOnly, getAllOrders);
  router.put("/:id/status", protect, adminOnly, updateOrderStatus);

  export default router;
