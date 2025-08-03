import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (item) => {
    if (wishlistItems.some((i) => i.id === item.id)) {
      toast.info("Item is already in wishlist");
      return;
    }
    setWishlistItems((prev) => [...prev, item]);
    toast.success(`${item.name} added to wishlist`);
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
    toast.warning("Item removed from wishlist");
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    toast.warning("Wishlist cleared");
  };

  const isInWishlist = (id) => {
    return wishlistItems.some((item) => item.id === id);
  };

  const addToCartFromWishlist = (item, addToCart) => {
    addToCart(item);
    removeFromWishlist(item.id);
    toast.success("Item moved to cart");
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        addToCartFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
