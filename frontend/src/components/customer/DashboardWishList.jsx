import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { toast } from "@/components/ui/sonner";
import { Link } from "react-router-dom";

const DashboardWishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart`);
    removeFromWishlist(item.id);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Heart className="h-5 w-5 text-red-500" /> Wishlist
        <span className="text-sm text-muted-foreground">
          ({wishlistItems.length} items)
        </span>
      </h2>

      {wishlistItems.length === 0 ? (
        <Card>
          <CardContent className="text-center py-10">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              Your wishlist is empty. Start adding products you love!
            </p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-primary font-bold">${item.price}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleAddToCart(item)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardWishlist;
