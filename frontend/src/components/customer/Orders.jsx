import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Package, Calendar, XCircle } from "lucide-react";
import axios from "axios";
import dayjs from "dayjs";

const Orders = ({ orders, loading, error }) => {
  const [orderList, setOrderList] = useState(orders || []);
  const [canceling, setCanceling] = useState("");

  const handleCancel = async (orderId, status) => {
    // Prevent cancel if status is Pending
    if (status === "Pending") {
      toast.error("You cannot cancel an order while it's still pending.");
      return;
    }

    try {
      setCanceling(orderId);
      const res = await axios.put(
        `/api/orders/${orderId}/cancel`,
        {},
        { withCredentials: true }
      );

      const updatedOrder = res.data.order;
      setOrderList((prev) =>
        prev.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
      toast.success(res.data.message);
    } catch (err) {
      const message = err.response?.data?.message || "Failed to cancel order";
      toast.error(message);
    } finally {
      setCanceling("");
    }
  };

  if (loading)
    return (
      <div className="text-center py-6 text-muted-foreground">
        Loading your orders...
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center py-6">Error: {error}</div>;
  if (!orderList || orderList.length === 0)
    return (
      <div className="text-center py-12 text-muted-foreground">
        You haven’t placed any orders yet.
      </div>
    );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>

      {orderList.map((order) => {
        const formattedDate = order.createdAt
          ? dayjs(order.createdAt).format("DD MMM YYYY")
          : "N/A";
        const status = order.status || "Pending";

        const isCancelable = ["Processing"].includes(status); // Only allow cancel for Processing

        return (
          <Card key={order.id} className="shadow-sm hover:shadow-md transition">
            <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-primary" />
                <CardTitle>Order #{order.id?.slice(0, 8)}</CardTitle>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-lg font-semibold">
                    Total:{" "}
                    <span className="text-primary">
                      ₹{order.total?.toFixed(2) || "0.00"}
                    </span>
                  </p>
                  <Badge
                    variant={
                      status === "Delivered"
                        ? "default"
                        : status === "Cancelled"
                        ? "destructive"
                        : "outline"
                    }
                    className="capitalize mt-1"
                  >
                    {status}
                  </Badge>
                </div>

                {isCancelable ? (
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={canceling === order.id}
                    onClick={() => handleCancel(order.id, status)}
                    className="flex items-center gap-2"
                  >
                    <XCircle className="h-4 w-4" />
                    {canceling === order.id ? "Cancelling..." : "Cancel Order"}
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className="flex items-center gap-2 cursor-not-allowed opacity-60"
                  >
                    <XCircle className="h-4 w-4" />
                    Not Cancellable
                  </Button>
                )}
              </div>

              {order.products && order.products.length > 0 && (
                <div className="border-t pt-4">
                  <p className="text-sm font-medium mb-2">Products:</p>
                  <div className="grid gap-3">
                    {order.products.map((p, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-sm"
                      >
                        <span>
                          {p.name} × {p.quantity}
                        </span>
                        <span className="font-semibold">₹{p.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Orders;
