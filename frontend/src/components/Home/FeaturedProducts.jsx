import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";

// Mock product data
const featuredProducts = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 199,
    originalPrice: 299,
    rating: 4.8,
    reviews: 324,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    badge: "Best Seller",
    discount: 33
  },
  {
    id: "2", 
    name: "Smart Fitness Watch",
    price: 299,
    rating: 4.6,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    badge: "New" 
  },
  {
    id: "3",
    name: "Minimalist Desk Lamp",
    price: 89,
    originalPrice: 120,
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    badge: "Sale",
    discount: 26
  },
  {
    id: "4",
    name: "Organic Cotton T-Shirt",
    price: 45,
    rating: 4.7,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    badge: "Trending"
  },
  {
    id: "5",
    name: "Professional Camera Lens",
    price: 449,
    originalPrice: 599,
    rating: 4.9,
    reviews: 78,
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop",
    badge: "Sale",
    discount: 25
  },
  {
    id: "6",
    name: "Luxury Leather Wallet",
    price: 89,
    rating: 4.5,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop",
    badge: "New" 
  },
  {
    id: "7",
    name: "Bluetooth Speaker Pro",
    price: 159,
    originalPrice: 199,
    rating: 4.8,
    reviews: 267,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    badge: "Best Seller" ,
    discount: 20
  },
  {
    id: "8",
    name: "Ceramic Coffee Mug Set",
    price: 39,
    rating: 4.6,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop",
    badge: "Trending" 
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-space">
            Featured Products
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-inter">
            Handpicked favorites that our customers love. Quality, style, and value in every selection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;