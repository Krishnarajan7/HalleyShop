import { useState } from "react";
import { Search, ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { getCartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();

  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative">
                <span className="text-3xl font-bold font-space bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                  H
                </span>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              </div>
              <span className="text-xl font-medium font-space text-primary">
                alleyShop
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Products
              </Link>
              <Link
                to="/deals"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Deals
              </Link>
              <Link
                to="/new-arrivals"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                New Arrivals
              </Link>
              <Link
                to="/brands"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Brands
              </Link>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                className="pl-10 bg-muted/30 border-border focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-2">
            {/* Desktop Icons */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hidden md:flex border border-transparent hover:border-red-200 hover:bg-red-50"
              asChild
            >
              <Link to="/wishlist">
                <Heart className="h-5 w-5 text-red-500 hover:text-red-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative border border-transparent hover:border-blue-200 hover:bg-blue-50"
              asChild
            >
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              asChild
            >
              <Link
                to={
                  user
                    ? user.role === "admin"
                      ? "/dashboard/admin"
                      : "/dashboard/customer"
                    : "/auth"
                }
              >
                <User className="h-5 w-5" />
              </Link>
            </Button>

            {/* Mobile Icons - show login button */}
            <Button variant="ghost" size="icon" className="md:hidden" asChild>
              <Link
                to={
                  user
                    ? user.role === "admin"
                      ? "/dashboard/admin"
                      : "/dashboard/customer"
                    : "/auth"
                }
              >
                <User className="h-5 w-5" />
              </Link>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="space-y-2">
              <Link
                to="/"
                className="block py-3 px-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="block py-3 px-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
              >
                Products
              </Link>
              <Link
                to="/deals"
                className="block py-3 px-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
              >
                Deals
              </Link>
              <Link
                to="/new-arrivals"
                className="block py-3 px-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
              >
                New Arrivals
              </Link>
              <Link
                to="/brands"
                className="block py-3 px-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
              >
                Brands
              </Link>
              <Link
                to="/wishlist"
                className="block py-3 px-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors relative"
              >
                Wishlist
                {wishlistItems.length > 0 && (
                  <span className="absolute top-1 right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <Link
                to={
                  user
                    ? user.role === "admin"
                      ? "/dashboard/admin"
                      : "/dashboard/customer"
                    : "/auth"
                }
                className="block py-3 px-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
              >
                Account
              </Link>
            </nav>
          </div>
        )}

        {/* Mobile Search Bar - Only when menu is closed */}
        {!isMenuOpen && (
          <div className="md:hidden py-3 border-t border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search millions of products..."
                className="pl-10 bg-muted/30 border-border focus:border-primary transition-colors"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
