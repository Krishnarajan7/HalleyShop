import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const Wishlist = ({ wishlistItems: initialWishlistItems }) => {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await fetch("/api/wishlist", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch wishlist");
        const data = await res.json();
        setWishlistItems(data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        toast.error("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const removeItem = async (itemId) => {
    try {
      const res = await fetch(`/api/wishlist/${itemId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to remove item");
      setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
      toast.success("Item removed from wishlist");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>No items in your wishlist.</p>
      ) : (
        wishlistItems.map((item) => (
          <Card key={item.id} className="mb-4">
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <p>Price: ${item.price}</p>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" onClick={() => removeItem(item.id)}>
                <Heart className="h-4 w-4 mr-2" /> Remove
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default Wishlist;