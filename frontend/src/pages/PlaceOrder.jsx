import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { useLocation } from "react-router-dom";

const PlaceOrder = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [cartItems, setCartItems] = useState([]);
  const [shipping, setShipping] = useState({
    addressLine1: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const [quantities, setQuantities] = useState({});

  // Load cart from localStorage on mount
  useEffect(() => {
    if (!user) {
      toast({ title: "Login required", description: "Please login first." });
      navigate("/auth");
      return;
    }

    const singleProductOrder = location.state?.items;

    if (singleProductOrder) {
      setCartItems(singleProductOrder);

      const qtys = {};
      singleProductOrder.forEach((item) => {
        qtys[item.productId] = item.quantity || 1;
      });
      setQuantities(qtys);
    } else {
      const stored = localStorage.getItem("cart");
      if (stored) {
        const parsed = JSON.parse(stored);
        setCartItems(parsed);

        const qtys = {};
        parsed.forEach((item) => {
          qtys[item.id] = item.quantity || 1;
        });
        setQuantities(qtys);
      }
    }
  }, [user, location.state]);

  const handleInputChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleQuantityChange = (productId, value) => {
    const val = parseInt(value);
    if (val > 0) {
      setQuantities({ ...quantities, [productId]: val });
    }
  };

  const handleOrder = async () => {
    const { addressLine1, city, state, zip, country, phone } = shipping;

    if (!addressLine1 || !city || !state || !zip || !country || !phone) {
      toast({
        title: "Missing Fields",
        description: "Please fill out all shipping details.",
      });
      return;
    }

    if (!cartItems.length) {
      toast({
        title: "Cart is empty",
        description: "Add items to cart first.",
      });
      return;
    }

    const products = cartItems.map((item) => ({
      productId: item.id,
      quantity: quantities[item.id] || 1,
    }));

    const payload = {
      products,
      shippingAddress: shipping,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Order Placed",
          description: "Your order has been placed successfully.",
        });
        localStorage.removeItem("cart");
        setCartItems([]);
        navigate("/dashboard/customer");
      } else {
        toast({
          title: "Order Failed",
          description: data?.message || "Something went wrong.",
        });
      }
    } catch (err) {
      toast({ title: "Server Error", description: "Please try again later." });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold text-center">Place Your Order</h2>

      {/* Cart Items Section */}
      <div className="bg-white rounded shadow p-6 space-y-4">
        <h3 className="text-xl font-semibold mb-4">Your Cart</h3>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-4"
            >
              <div>
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-gray-500 text-sm">${item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm">Qty:</label>
                <input
                  type="number"
                  min="1"
                  value={quantities[item.id] || 1}
                  onChange={(e) =>
                    handleQuantityChange(item.id, e.target.value)
                  }
                  className="w-16 border rounded px-2 py-1 text-center"
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">Your cart is empty.</p>
        )}
      </div>

      {/* Shipping Form */}
      <div className="bg-white rounded shadow p-6 space-y-4">
        <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["addressLine1", "city", "state", "zip", "country", "phone"].map(
            (field) => (
              <input
                key={field}
                name={field}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="p-2 border rounded w-full"
                onChange={handleInputChange}
              />
            )
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          onClick={handleOrder}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-lg font-medium"
        >
          Confirm & Place Order
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
