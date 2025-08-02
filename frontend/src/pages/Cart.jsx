import { useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import FloatingButtons from "@/components/Layout/FloatingButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } =
    useCart();
  const [promoCode, setPromoCode] = useState("");
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 15;
  const discount = promoCode === "SAVE10" ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  const [shippingAddress, setShippingAddress] = useState({
    addressLine1: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handlePlaceOrder = async () => {
  // Validate shipping fields
  for (const key in shippingAddress) {
    if (!shippingAddress[key]) {
      toast.error(`Please enter ${key.replace(/([A-Z])/g, " ")}`);
      return;
    }
  }

  setLoading(true);
  try {
    const payload = {
      products: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      shippingAddress,
    };

    const response = await axios.post("/api/orders/place", payload, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    toast.success("Order placed successfully!");
    clearCart(false); 
    navigate("/orders");
  } catch (error) {
    console.error("Order failed:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Failed to place order");
  } finally {
    setLoading(false);
  }
};


  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <FloatingButtons />

        <main className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground" />
            <div>
              <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
              <p className="text-muted-foreground">
                Add some products to get started
              </p>
            </div>
            <Button asChild>
              <a href="/products">Continue Shopping</a>
            </Button>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FloatingButtons />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" asChild>
            <a href="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-2xl font-bold">
              Shopping Cart ({items.length} items)
            </h1>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <a
                        href={`/product/${item.id}`}
                        className="hover:text-primary transition-colors"
                      >
                        <h3 className="font-semibold mb-1">{item.name}</h3>
                      </a>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Size: {item.size}</p>
                        <p>Color: {item.color}</p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              item.quantity > 1 &&
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-semibold">
                              ${item.price * item.quantity}
                            </div>
                            {item.originalPrice && (
                              <div className="text-sm text-muted-foreground line-through">
                                ${item.originalPrice * item.quantity}
                              </div>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              {/* Promo Code */}
              <div className="space-y-3 mb-6">
                <label className="text-sm font-medium">Promo Code</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline">Apply</Button>
                </div>
                {promoCode === "SAVE10" && (
                  <p className="text-sm text-success">
                    Promo code applied! 10% off
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {!showCheckoutForm ? (
                <Button
                  size="lg"
                  className="w-full mt-6"
                  onClick={() => setShowCheckoutForm(true)}
                >
                  Proceed to Checkout
                </Button>
              ) : (
                <div className="mt-6 space-y-4">
                  <h3 className="font-semibold text-lg">Shipping Details</h3>
                  {[
                    "addressLine1",
                    "city",
                    "state",
                    "zip",
                    "country",
                    "phone",
                  ].map((field) => (
                    <Input
                      key={field}
                      name={field}
                      placeholder={field.replace(/([A-Z])/g, " $1")}
                      value={shippingAddress[field]}
                      onChange={handleChange}
                    />
                  ))}
                  <Button
                    size="lg"
                    className="w-full mt-4"
                    onClick={handlePlaceOrder}
                    disabled={loading}
                  >
                    {loading ? "Placing Order..." : "Place Order"}
                  </Button>
                </div>
              )}

              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">
                  Free shipping on orders over $100
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
