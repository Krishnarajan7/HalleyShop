import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  const saveStatusUpdate = async () => {
    if (!selectedOrder || !newStatus) return;

    setUpdatingStatus(true);
    try {
      await axios.put(`/api/orders/${selectedOrder.id}/status`, { status: newStatus }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      await fetchOrders();
      setSelectedOrder(null);
    } catch (error) {
      console.error("Failed to update order status", error);
    } finally {
      setUpdatingStatus(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status); // initialize dropdown value
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Order Management</h1>
        <Button>Export Orders</Button>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Order ID: {order.id}</p>
                  <p className="text-sm text-muted-foreground">
                    Customer: {order.user?.firstName || "N/A"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right space-y-2">
                  <p className="font-semibold">${order.total.toFixed(2)}</p>
                  <Badge
                    variant={
                      order.status === "Delivered"
                        ? "default"
                        : order.status === "Shipped"
                        ? "secondary"
                        : order.status === "Pending"
                        ? "outline"
                        : "destructive"
                    }
                  >
                    {order.status}
                  </Badge>
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(order)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-sm">
              <p><strong>Order ID:</strong> {selectedOrder.id}</p>
              <p><strong>Customer:</strong> {selectedOrder.user?.firstName} {selectedOrder.user?.lastName}</p>
              <p><strong>Email:</strong> {selectedOrder.user?.email}</p>
              <p><strong>Total:</strong> ${selectedOrder.total.toFixed(2)}</p>
              <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>

              {/* Status Dropdown */}
              <div className="space-y-1">
                <Label>Status</Label>
                <Select
                  value={newStatus}
                  onValueChange={(value) => setNewStatus(value)}
                  disabled={updatingStatus}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="mt-2"
                disabled={updatingStatus || newStatus === selectedOrder.status}
                onClick={saveStatusUpdate}
              >
                {updatingStatus ? "Saving..." : "Save"}
              </Button>

              {/* Shipping Address */}
              {selectedOrder.shippingAddress && (
                <>
                  <h4 className="font-semibold mt-4">Shipping Address</h4>
                  <p>{selectedOrder.shippingAddress.addressLine1}</p>
                  <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.zip}</p>
                  <p>{selectedOrder.shippingAddress.country}</p>
                  <p>Phone: {selectedOrder.shippingAddress.phone}</p>
                </>
              )}

              {/* Products */}
              {Array.isArray(selectedOrder.products) && (
                <>
                  <h4 className="font-semibold mt-4">Products</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedOrder.products.map((item, index) => (
                      <li key={index}>
                        <strong>{item.productName}</strong> &mdash; Quantity: {item.quantity}, Price: ${item.price}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default OrderManagement;
