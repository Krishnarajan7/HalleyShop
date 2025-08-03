import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const CartContext = createContext(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const { toast } = useToast();

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  // ✅ Add to cart with wishlist support
  const addToCart = (product, fromWishlist = false) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        toast({
          title: "Updated Cart",
          description: `${product.name} quantity updated in your cart.`,
        });

        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast({
          title: fromWishlist ? "Moved from Wishlist" : "Added to Cart",
          description: `${product.name} ${
            fromWishlist ? "has been moved to your cart." : "has been added to your cart."
          }`,
        });

        return [...currentItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id, showToast = true) => {
    setItems((currentItems) => {
      const item = currentItems.find((item) => item.id === id);
      if (item && showToast) {
        toast({
          title: "Removed from Cart",
          description: `${item.name} has been removed from your cart.`,
        });
      }
      return currentItems.filter((item) => item.id !== id);
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = (showToast = true) => {
    setItems([]);
    if (showToast) {
      toast({
        title: "Cart Cleared",
        description: "All items have been removed from your cart.",
      });
    }
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  // ✅ Sync local cart with backend after login
  const mergeCartAfterLogin = async () => {
    if (items.length === 0) return;

    try {
      await axios.post(
        "http://localhost:5000/api/cart/sync",
        { items },
        { withCredentials: true }
      );
      console.log("Cart synced successfully with backend.");
      clearCart(false); // clear local cart after successful sync
    } catch (error) {
      console.error("Cart sync failed:", error);
    }
  };

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    mergeCartAfterLogin, 
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
