import { useState } from "react";
import { Search, Star, ArrowRight, Award, Users, ShoppingBag } from "lucide-react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import FloatingButtons from "@/components/Layout/FloatingButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const Brands = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const featuredBrands = [
    {
      id: 1,
      name: "Apple",
      logo: "https://images.unsplash.com/photo-1621768216002-5ac171876625?w=200&h=200&fit=crop&auto=format",
      category: "Electronics",
      rating: 4.9,
      products: 1250,
      followers: "2.1M",
      verified: true,
      description: "Innovation at its finest - iPhone, iPad, Mac, and more"
    },
    {
      id: 2,
      name: "Samsung",
      logo: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=200&h=200&fit=crop&auto=format",
      category: "Electronics",
      rating: 4.8,
      products: 2100,
      followers: "1.8M",
      verified: true,
      description: "Technology for everyone - smartphones, TVs, appliances"
    },
    {
      id: 3,
      name: "Nike",
      logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop&auto=format",
      category: "Fashion",
      rating: 4.7,
      products: 890,
      followers: "1.5M",
      verified: true,
      description: "Just Do It - premium sportswear and footwear"
    },
    {
      id: 4,
      name: "Sony",
      logo: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop&auto=format",
      category: "Electronics",
      rating: 4.6,
      products: 1560,
      followers: "980K",
      verified: true,
      description: "Entertainment and technology innovation"
    }
  ];

  const brandCategories = [
    {
      name: "Electronics",
      count: 156,
      brands: ["Apple", "Samsung", "Sony", "LG", "HP", "Dell", "Asus", "Canon"]
    },
    {
      name: "Fashion",
      count: 89,
      brands: ["Nike", "Adidas", "Zara", "H&M", "Gucci", "Prada", "Versace", "Calvin Klein"]
    },
    {
      name: "Beauty",
      count: 67,
      brands: ["L'Oreal", "Maybelline", "MAC", "Clinique", "Estee Lauder", "Dior", "Chanel"]
    },
    {
      name: "Home & Garden",
      count: 45,
      brands: ["IKEA", "Home Depot", "Lowe's", "Williams Sonoma", "Crate & Barrel"]
    },
    {
      name: "Sports",
      count: 78,
      brands: ["Nike", "Adidas", "Under Armour", "Puma", "Reebok", "New Balance"]
    },
    {
      name: "Automotive",
      count: 34,
      brands: ["BMW", "Mercedes", "Audi", "Toyota", "Honda", "Ford"]
    }
  ];

  const allBrands = [
    "Apple", "Samsung", "Nike", "Adidas", "Sony", "LG", "HP", "Dell", "Asus", "Canon",
    "Zara", "H&M", "Gucci", "Prada", "Versace", "Calvin Klein", "L'Oreal", "Maybelline",
    "MAC", "Clinique", "Estee Lauder", "Dior", "Chanel", "IKEA", "Home Depot", "Lowe's",
    "Williams Sonoma", "Crate & Barrel", "Under Armour", "Puma", "Reebok", "New Balance",
    "BMW", "Mercedes", "Audi", "Toyota", "Honda", "Ford", "Microsoft", "Google", "Amazon"
  ];

  const filteredBrands = allBrands.filter(brand =>
    brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />
      <FloatingButtons />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-3xl p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Award className="h-8 w-8 text-accent animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-bold font-space">Top Brands</h1>
            </div>
            <p className="text-xl text-muted-foreground mb-6">
              Shop from the world's most trusted and premium brands
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span>Verified Partners</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span>Authentic Products</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                <span>Global Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Brands */}
        <div className="mb-12">
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg bg-muted/30 border border-border/50 focus:border-accent focus:bg-background focus:ring-1 focus:ring-accent/50"
            />
          </div>
        </div>

        {/* Featured Brands */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold font-space mb-8 text-center">Featured Brands</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBrands.map((brand) => (
              <div key={brand.id} className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 group">
                <div className="text-center mb-4">
                  <div className="relative inline-block mb-4">
                    <img 
                      src={brand.logo} 
                      alt={brand.name}
                      className="w-20 h-20 object-contain mx-auto rounded-xl bg-muted p-4"
                    />
                    {brand.verified && (
                      <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs">
                        ✓
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{brand.name}</h3>
                  <Badge variant="outline" className="mb-3">{brand.category}</Badge>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {brand.description}
                  </p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {brand.rating}
                    </span>
                    <span className="text-muted-foreground">{brand.products} products</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {brand.followers}
                    </span>
                    <span className="text-muted-foreground">followers</span>
                  </div>
                </div>
                
                <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Shop Now
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Brand Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold font-space mb-8 text-center">Shop by Category</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandCategories.map((category) => (
              <div key={category.name} className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 group cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <Badge variant="secondary">{category.count} brands</Badge>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {category.brands.slice(0, 6).map((brand) => (
                    <Badge key={brand} variant="outline" className="text-xs">
                      {brand}
                    </Badge>
                  ))}
                  {category.brands.length > 6 && (
                    <Badge variant="outline" className="text-xs">
                      +{category.brands.length - 6} more
                    </Badge>
                  )}
                </div>
                
                <Button variant="ghost" className="w-full justify-between group-hover:bg-primary/10 transition-colors">
                  View All Brands
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* All Brands */}
        <section>
          <h2 className="text-3xl font-bold font-space mb-8 text-center">All Brands</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {filteredBrands.map((brand) => (
              <Button
                key={brand}
                variant="outline"
                className="h-12 justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {brand}
              </Button>
            ))}
          </div>
          
          {filteredBrands.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No brands found matching your search.</p>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Brands;