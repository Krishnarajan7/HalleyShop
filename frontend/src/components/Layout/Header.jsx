import { useState } from "react";
import { Search, ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <a href="/" className="flex items-center space-x-2">
              <div className="relative">
                <span className="text-3xl font-bold font-space bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                  H
                </span>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              </div>
              <span className="text-xl font-medium font-space text-primary">alleyShop</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Home</a>
              <a href="/products" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Products</a>
              <a href="/deals" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Deals</a>
              <a href="/new-arrivals" className="text-sm font-medium text-foreground hover:text-primary transition-colors">New Arrivals</a>
              <a href="/brands" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Brands</a>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search products..." 
                className="pl-10 bg-muted/20"
              />
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-2">
            {/* Desktop Icons */}
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="relative" asChild>
              <a href="/cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </a>
            </Button>

            <Button variant="ghost" size="icon" className="hidden md:flex" asChild>
              <a href="/auth">
                <User className="h-5 w-5" />
              </a>
            </Button>

            {/* Mobile Icons - show login button */}
            <Button variant="ghost" size="icon" className="md:hidden" asChild>
              <a href="/auth">
                <User className="h-4 w-4" />
              </a>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="space-y-2">
              <a href="/" className="block py-3 px-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors">Home</a>
              <a href="/products" className="block py-3 px-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors">Products</a>
              <a href="/deals" className="block py-3 px-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors">Deals</a>
              <a href="/new-arrivals" className="block py-3 px-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors">New Arrivals</a>
              <a href="/brands" className="block py-3 px-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors">Brands</a>
              <a href="#" className="block py-3 px-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors">Wishlist</a>
              <a href="/auth" className="block py-3 px-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors">Account</a>
            </nav>
          </div>
        )}

        {/* Mobile Search Bar - Only when menu is closed */}
        {!isMenuOpen && (
          <div className="md:hidden py-3 border-t border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search products..." 
                className="pl-10 bg-muted/30 "
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;