import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Layout/Header";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { user } = useAuth(); // Auth context
  const navigate = useNavigate();

  const handleAddToCart = async (item) => {
    if (!user) {
      toast.error("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }

    try {
      await addToCart(item);
      toast.success(`${item.name} added to cart`);
      removeFromWishlist(item.id); // Remove from wishlist after adding to cart
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const handleRemove = async (item) => {
    try {
      await removeFromWishlist(item.id); // Call wishlist context remove
      toast.warning(`${item.name} removed from wishlist`);
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove item from wishlist");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-6 w-6 text-red-500" />
          <h1 className="text-2xl font-bold">My Wishlist</h1>
          <span className="text-sm text-muted-foreground">
            ({wishlistItems.length} items)
          </span>
        </div>

        {/* Empty State */}
        {wishlistItems.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-muted-foreground mb-6">
                Start adding products you love!
              </p>
              <Button asChild>
                <Link to="/products">Browse Products</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
                    {/* Product Image */}
                    <img
                      src={item.image || "/placeholder.png"}
                      alt={item.name}
                      className="w-24 h-24 rounded-lg object-cover"
                      onError={(e) => (e.target.src = "/placeholder.png")}
                    />

                    {/* Product Info */}
                    <div className="flex-1 space-y-2">
                      <Link
                        to={`/product/${item.id}`}
                        className="font-semibold text-lg hover:text-primary"
                      >
                        {item.name}
                      </Link>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-primary">
                          ${item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                      <Button
                        size="sm"
                        className="w-full sm:min-w-32"
                        onClick={() => handleAddToCart(item)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:min-w-32"
                        onClick={() => handleRemove(item)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
