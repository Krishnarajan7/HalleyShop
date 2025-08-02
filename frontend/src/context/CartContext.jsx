import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

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

  // Load from localStorage on first load
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }, []);

  // Save to localStorage whenever cart updates
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  const addToCart = (product) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        toast({
          title: "Updated cart",
          description: `${product.name} quantity updated in cart`,
        });

        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart`,
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
          title: "Removed from cart",
          description: `${item.name} has been removed from your cart`,
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
        title: "Cart cleared",
        description: "All items have been removed from your cart",
      });
    }
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
