import { useState } from "react";
import { Clock, Flame, Star, ShoppingCart } from "lucide-react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import FloatingButtons from "@/components/Layout/FloatingButtons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Deals = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  const flashDeals = [
    {
      id: 1,
      name: "Wireless Earbuds Pro",
      originalPrice: 199,
      salePrice: 59,
      discount: 70,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format",
      rating: 4.8,
      reviews: 2340,
      sold: 1250,
      total: 2000
    },
    {
      id: 2,
      name: "Smart Watch Series X",
      originalPrice: 399,
      salePrice: 159,
      discount: 60,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&auto=format",
      rating: 4.9,
      reviews: 1890,
      sold: 890,
      total: 1500
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      originalPrice: 149,
      salePrice: 39,
      discount: 74,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&auto=format",
      rating: 4.7,
      reviews: 3200,
      sold: 1800,
      total: 2500
    },
    {
      id: 4,
      name: "Gaming Headset RGB",
      originalPrice: 129,
      salePrice: 45,
      discount: 65,
      image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop&auto=format",
      rating: 4.6,
      reviews: 1560,
      sold: 720,
      total: 1200
    }
  ];

  const dailyDeals = [
    {
      id: 5,
      name: "Laptop Stand Adjustable",
      originalPrice: 89,
      salePrice: 29,
      discount: 67,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&auto=format",
      rating: 4.5,
      reviews: 890
    },
    {
      id: 6,
      name: "USB-C Hub 7-in-1",
      originalPrice: 79,
      salePrice: 25,
      discount: 68,
      image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop&auto=format",
      rating: 4.7,
      reviews: 1200
    },
    {
      id: 7,
      name: "Wireless Charger Pad",
      originalPrice: 49,
      salePrice: 15,
      discount: 69,
      image: "https://images.unsplash.com/photo-1594742690675-4b0b2c5c1983?w=400&h=400&fit=crop&auto=format",
      rating: 4.4,
      reviews: 670
    },
    {
      id: 8,
      name: "Phone Camera Lens Kit",
      originalPrice: 69,
      salePrice: 22,
      discount: 68,
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop&auto=format",
      rating: 4.6,
      reviews: 450
    }
  ];

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />
      <FloatingButtons />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-3xl p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Flame className="h-8 w-8 text-accent animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-bold font-space">Flash Deals</h1>
            </div>
            <p className="text-xl text-muted-foreground mb-6">
              Limited time offers - Up to 70% OFF on trending products
            </p>
            
            {/* Countdown Timer */}
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Clock className="h-5 w-5 text-accent" />
              <span className="text-muted-foreground">Ends in:</span>
              <div className="flex gap-2">
                <div className="bg-accent text-accent-foreground px-3 py-1 rounded-lg">
                  {timeLeft.hours}h
                </div>
                <div className="bg-accent text-accent-foreground px-3 py-1 rounded-lg">
                  {timeLeft.minutes}m
                </div>
                <div className="bg-accent text-accent-foreground px-3 py-1 rounded-lg">
                  {timeLeft.seconds}s
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Flash Deals Grid */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Flame className="h-6 w-6 text-accent" />
            <h2 className="text-3xl font-bold font-space">Flash Sales</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashDeals.map((product) => (
              <div key={product.id} className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 group">
                <div className="relative mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
                    -{product.discount}%
                  </Badge>
                  
                  {/* Progress Bar */}
                  <div className="absolute bottom-2 left-2 right-2 bg-background/90 rounded-lg p-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Sold: {product.sold}</span>
                      <span>Total: {product.total}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-accent h-2 rounded-full transition-all"
                        style={{ width: `${(product.sold / product.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews})</span>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-accent">${product.salePrice}</span>
                  <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                </div>
                
                <Button className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Daily Deals */}
        <section>
          <h2 className="text-3xl font-bold font-space mb-8">Daily Deals</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dailyDeals.map((product) => (
              <div key={product.id} className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 group">
                <div className="relative mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground">
                    -{product.discount}%
                  </Badge>
                </div>
                
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews})</span>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-accent">${product.salePrice}</span>
                  <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                </div>
                
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Deals;