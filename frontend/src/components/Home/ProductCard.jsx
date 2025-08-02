import { Heart, ShoppingCart, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  rating,
  reviews,
  image,
  badge,
  discount,
}) => {
  const { addToCart, items } = useCart();
  const { user } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [redirectToCart, setRedirectToCart] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  const formatPrice = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/auth", { state: { from: "/cart" } });
      return;
    }
    addToCart({ id, name, price, originalPrice, image });
    toast.success(`${name} added to cart`);
  };

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      navigate("/auth", { state: { from: "/wishlist" } });
      return;
    }
    setIsWishlisted(!isWishlisted);
    toast[isWishlisted ? "warning" : "success"](
      `${name} ${isWishlisted ? "removed from" : "added to"} wishlist`
    );
  };

  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      navigate("/auth", { state: { from: "/place-order", productId: id } });
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

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-200 hover:border-primary shadow-md hover:shadow-xl overflow-hidden transition-all duration-300">
      <div className="relative overflow-hidden bg-gray-50">
        <img
          src={image}
          alt={name}
          className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {badge && (
          <Badge className={`absolute top-3 left-3 ${badgeVariants[badge] || ""}`}>
            {badge}
          </Badge>
        )}
        {discount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discount}%
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-red-100 transition-all border"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isWishlisted ? "text-red-500 fill-red-500" : "text-gray-500"
            }`}
          />
        </Button>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-yellow-500">
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
          <span className="text-xs text-gray-500">({reviews})</span>
        </div>
        <h3 className="font-semibold text-base md:text-lg line-clamp-2 hover:text-primary transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">{formatPrice(price)}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Button onClick={handleAddToCart} variant="outline" size="sm">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Cart
          </Button>
          <Button onClick={handlePlaceOrder} variant="default" size="sm">
            <Truck className="h-4 w-4 mr-2" />
            Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
