import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// POST /api/orders/place
export const placeOrder = async (req, res) => {
  try {
    const { products, shippingAddress } = req.body;
    const userId = req.user.id;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "No products provided." });
    }

    let total = 0;
    const orderItems = [];

    for (const item of products) {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(item.productId) },
      });

      if (!product) {
        return res
          .status(404)
          .json({ message: `Product ID ${item.productId} not found.` });
      }

      if (item.quantity > product.stock) {
        return res.status(400).json({
          message: `Insufficient stock for product ${product.name}`,
        });
      }

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      orderItems.push({
        productId: product.id,
        productName: product.name,
        quantity: item.quantity,
        imageUrl: product.imageUrl,
        price: product.price,
      });
    }

    // Save the order
    const newOrder = await prisma.order.create({
      data: {
        userId,
        total,
        products: orderItems,
        shippingAddress,
      },
    });

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({ message: "Server error while placing order." });
  }
};

// GET /api/orders/my
export const getMyOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Fetch My Orders Error:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
    });

    if (!order || order.userId !== req.user.id) {
      return res
        .status(404)
        .json({ message: "Order not found or unauthorized" });
    }

    if (order.status !== "Pending") {
      return res
        .status(400)
        .json({ message: "Only pending orders can be canceled" });
    }

    const canceledOrder = await prisma.order.update({
      where: { id: req.params.id },
      data: { status: "Canceled" },
    });

    res
      .status(200)
      .json({ message: "Order canceled successfully", order: canceledOrder });
  } catch (error) {
    console.error("Cancel Order Error:", error);
    res
      .status(500)
      .json({ message: "Failed to cancel order", error: error.message });
  }
};

// GET /api/orders/:id
export const getOrderById = async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
    });

    if (!order || order.userId !== req.user.id) {
      return res
        .status(404)
        .json({ message: "Order not found or unauthorized" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Get Order By ID Error:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch order", error: error.message });
  }
};

// Admin Only - GET /api/orders/
// Admin Only - GET /api/orders/
export const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Admin Get All Orders Error:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch all orders", error: error.message });
  }
};


// Admin Only - PUT /api/orders/:id/status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedOrder = await prisma.order.update({
      where: { id: req.params.id },
      data: { status },
    });

    res
      .status(200)
      .json({ message: "Order status updated", order: updatedOrder });
  } catch (error) {
    console.error("Update Order Status Error:", error);
    res
      .status(500)
      .json({ message: "Failed to update status", error: error.message });
  }
};
