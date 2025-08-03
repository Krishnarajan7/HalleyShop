import { Heart, ShoppingCart, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useWishlist } from "@/context/WishlistContext";

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  rating = 4,
  reviews = 0,
  image,
  badge,
  discount,
}) => {
  const { addToCart, items } = useCart();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [redirectToCart, setRedirectToCart] = useState(false);

  const isAuthenticated = !!user;

  const formatPrice = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.warning("Please login to add items to cart");
      navigate("/auth", { state: { from: location.pathname } });
      return;
    }
    addToCart({ id, name, price, originalPrice, image });
    toast.success(`${name} added to cart`);
  };

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      toast.warning("Please login to manage wishlist");
      navigate("/auth", { state: { from: "/wishlist" } });
      return;
    }
    if (isInWishlist(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, name, price, originalPrice, image });
    }
  };

  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      toast.warning("Please login to place an order");
      navigate("/auth", { state: { from: "/cart", productId: id } });
      return;
    }
    addToCart({ id, name, price, originalPrice, image });
    setRedirectToCart(true);
  };

  useEffect(() => {
    if (redirectToCart) {
      navigate("/cart");
      setRedirectToCart(false);
    }
  }, [items, redirectToCart, navigate]);

  const badgeVariants = {
    New: "bg-success text-success-foreground",
    Sale: "bg-destructive text-destructive-foreground",
    Trending: "bg-accent text-accent-foreground",
    "Best Seller": "bg-primary text-primary-foreground",
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-200"></div>
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-200 hover:border-primary shadow-md hover:shadow-xl overflow-hidden transition-all duration-300">
      {/* Image Section */}
      <div className="relative overflow-hidden bg-gray-50 rounded-t-2xl">
        <img
          src={image}
          alt={name}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => (e.target.src = "/placeholder.png")}
        />

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-red-100 border rounded-full"
        >
          <Heart
            className={`h-5 w-5 ${
              isInWishlist(id) ? "text-red-500 fill-red-500" : "text-gray-500"
            }`}
          />
        </Button>

        {/* Discount Badge */}
        {discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discount}%
          </div>
        )}

        {/* Badge */}
        {badge && (
          <Badge
            className={`absolute bottom-3 left-3 ${badgeVariants[badge] || ""}`}
          >
            {badge}
          </Badge>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-2">
        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(rating)
                  ? "fill-yellow-500 text-yellow-500"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({reviews})</span>
        </div>

        {/* Name */}
        <h3 className="font-semibold text-base md:text-lg line-clamp-2 hover:text-primary transition-colors">
          {name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">
            {formatPrice(price)}
          </span>
          {originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        {/* Free Shipping Info */}
        <p className="text-xs text-green-600 flex items-center gap-1">
          <Truck className="h-3 w-3" /> Free Delivery Available
        </p>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Button
            onClick={handleAddToCart}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Cart
          </Button>
          <Button
            onClick={handlePlaceOrder}
            variant="default"
            size="sm"
            className="w-full"
          >
            <Truck className="h-4 w-4 mr-2" />
            Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
