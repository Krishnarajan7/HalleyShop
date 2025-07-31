import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Layout/Header";

const Wishlist = () => {
  // Mock wishlist data - in real app, this would come from context/state
  const wishlistItems = [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 199,
      originalPrice: 299,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format"
    },
    {
      id: "3",
      name: "Minimalist Desk Lamp",
      price: 89,
      originalPrice: 120,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-6 w-6 text-red-500" />
          <h1 className="text-2xl font-bold">My Wishlist</h1>
          <span className="text-sm text-muted-foreground">({wishlistItems.length} items)</span>
        </div>

        {wishlistItems.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
              <p className="text-muted-foreground mb-6">Start adding products you love!</p>
              <Button asChild>
                <a href="/products">Browse Products</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
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

                    <div className="flex flex-col gap-2">
                      <Button size="sm" className="min-w-32">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button variant="outline" size="sm" className="min-w-32">
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