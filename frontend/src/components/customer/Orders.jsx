import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Orders = ({ orders, loading, error }) => {
  const [orderList, setOrderList] = useState(orders || []);
  const [canceling, setCanceling] = useState("");

  const handleCancel = async (orderId) => {
    try {
      setCanceling(orderId);
      const res = await axios.put(`/api/orders/cancel/${orderId}`);
      const updatedOrder = res.data.order;

      setOrderList((prev) =>
        prev.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
      );
    } catch (err) {
      console.error("Cancel error:", err);
      alert("Failed to cancel order");
    } finally {
      setCanceling("");
    }
  };

  if (loading) return <div>Loading your orders...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!orderList || orderList.length === 0)
    return <p className="text-muted-foreground">You haven’t placed any orders yet.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      {orderList.map((order) => {
        const formattedDate = order.createdAt
          ? dayjs(order.createdAt).format("DD MMM YYYY")
          : "N/A";
        const status = order.status || "Pending";

        const isCancelable = ["Pending", "Processing"].includes(status);

        return (
          <Card key={order.id} className="mb-4">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Order #{order.id?.split("-")[0] || order.id}</CardTitle>
                <span className="text-sm text-muted-foreground">📅 {formattedDate}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <p className="text-lg font-medium">Total: ${order.total?.toFixed(2) || "0.00"}</p>
                <Badge variant="outline" className="capitalize">{status}</Badge>
              </div>

              {order.products && (
                <div className="text-sm text-muted-foreground mb-2">
                  Products:
                  <ul className="list-disc ml-4">
                    {order.products.map((p, i) => (
                      <li key={i}>
                        {p.name} — {p.quantity} pcs — ₹{p.price}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {isCancelable && (
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={canceling === order.id}
                  onClick={() => handleCancel(order.id)}
                >
                  {canceling === order.id ? "Cancelling..." : "Cancel Order"}
                </Button>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Orders;
