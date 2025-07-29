import { useState } from "react";
import { Filter, Grid, List, Star, Heart, ShoppingCart, Zap } from "lucide-react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import FloatingButtons from "@/components/Layout/FloatingButtons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const NewArrivals = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');

  const newProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      price: 1199,
      originalPrice: 1299,
      image: "https://images.unsplash.com/photo-1592286587946-8a744e6e161a?w=400&h=400&fit=crop&auto=format",
      rating: 4.9,
      reviews: 156,
      isNew: true,
      category: "Electronics",
      description: "Latest iPhone with titanium design and A17 Pro chip"
    },
    {
      id: 2,
      name: "MacBook Air M3",
      price: 1099,
      originalPrice: 1199,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop&auto=format",
      rating: 4.8,
      reviews: 89,
      isNew: true,
      category: "Electronics",
      description: "Revolutionary M3 chip with incredible performance"
    },
    {
      id: 3,
      name: "Nike Air Max 2024",
      price: 150,
      originalPrice: 180,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&auto=format",
      rating: 4.7,
      reviews: 234,
      isNew: true,
      category: "Fashion",
      description: "Latest Nike Air Max with advanced cushioning"
    },
    {
      id: 4,
      name: "Samsung Galaxy S24 Ultra",
      price: 1299,
      originalPrice: 1399,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&auto=format",
      rating: 4.8,
      reviews: 178,
      isNew: true,
      category: "Electronics",
      description: "Ultimate Galaxy experience with S Pen"
    },
    {
      id: 5,
      name: "PlayStation 5 Pro",
      price: 699,
      originalPrice: 799,
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop&auto=format",
      rating: 4.9,
      reviews: 267,
      isNew: true,
      category: "Gaming",
      description: "Enhanced PS5 with 8K gaming support"
    },
    {
      id: 6,
      name: "Apple Watch Series 9",
      price: 399,
      originalPrice: 449,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&auto=format",
      rating: 4.7,
      reviews: 145,
      isNew: true,
      category: "Electronics",
      description: "Most advanced Apple Watch ever"
    },
    {
      id: 7,
      name: "Adidas Boost 350 V3",
      price: 220,
      originalPrice: 250,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&auto=format",
      rating: 4.6,
      reviews: 189,
      isNew: true,
      category: "Fashion",
      description: "Next generation Boost technology"
    },
    {
      id: 8,
      name: "Sony WH-1000XM6",
      price: 399,
      originalPrice: 450,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format",
      rating: 4.8,
      reviews: 123,
      isNew: true,
      category: "Electronics",
      description: "Industry-leading noise cancellation"
    }
  ];

  const categories = ['All', 'Electronics', 'Fashion', 'Gaming', 'Home & Garden'];

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />
      <FloatingButtons />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-accent/10 via-primary/10 to-secondary/10 rounded-3xl p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-8 w-8 text-primary animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-bold font-space">New Arrivals</h1>
            </div>
            <p className="text-xl text-muted-foreground mb-6">
              Discover the latest products, fresh from our partners worldwide
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span>Latest Technology</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                <span>Limited Stock</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">Latest Products</h2>
            <Badge variant="secondary">{newProducts.length} items</Badge>
          </div>
          
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center gap-2 border border-border rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              className="whitespace-nowrap hover:bg-primary hover:text-primary-foreground"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid/List */}
        <div className={viewMode === 'grid' 
          ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
          : "space-y-4"
        }>
          {newProducts.map((product) => (
            <div 
              key={product.id} 
              className={`bg-card border border-border rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1 group ${
                viewMode === 'list' ? 'flex gap-6 p-6' : 'p-6'
              }`}
            >
              <div className={`relative ${viewMode === 'list' ? 'w-40 h-40' : 'mb-4'}`}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className={`object-cover rounded-xl ${
                    viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'
                  }`}
                />
                <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                  NEW
                </Badge>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              
              <div className={`flex-1 ${viewMode === 'list' ? '' : ''}`}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>
                
                {viewMode === 'list' && (
                  <p className="text-muted-foreground text-sm mb-3">
                    {product.description}
                  </p>
                )}
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-primary">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                
                <div className={`gap-2 ${viewMode === 'list' ? 'flex' : 'space-y-2'}`}>
                  <Button className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  {viewMode === 'list' && (
                    <Button variant="outline" className="flex-1">
                      Quick View
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            Load More Products
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewArrivals;