import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Filter, Grid, List, SlidersHorizontal, X } from "lucide-react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import FloatingButtons from "@/components/Layout/FloatingButtons";
import ProductCard from "@/components/Home/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

const categories = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Sports",
  "Beauty",
  "Books",
];
const brands = [
  "Apple",
  "Samsung",
  "Nike",
  "Adidas",
  "Sony",
  "LG",
  "Zara",
  "H&M",
];

const Products = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search") || ""; // ✅ Get search param

  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // ✅ Fetch products with search query
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const url = searchQuery
          ? `/api/products?search=${encodeURIComponent(searchQuery)}`
          : `/api/products`;

        const res = await fetch(url, { credentials: "include" });

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        setProducts(data.data?.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    setCurrentPage(1); // Reset to first page on new search
  }, [searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Header />
      <FloatingButtons />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <a href="/" className="hover:text-primary">
            Home
          </a>
          <span>/</span>
          <span className="text-foreground">All Products</span>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block w-64 space-y-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-4">Filters</h3>

              {/* Price Range */}
              <div className="space-y-4">
                <h4 className="font-medium text-sm">Price Range</h4>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={1000}
                  min={0}
                  step={10}
                  className="w-full"
                />
                <div className="flex items-center gap-2 text-sm">
                  <Input value={`₹${priceRange[0]}`} className="h-8" readOnly />
                  <span>-</span>
                  <Input value={`₹${priceRange[1]}`} className="h-8" readOnly />
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Categories</h4>
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox id={category} />
                    <label htmlFor={category} className="text-sm cursor-pointer">
                      {category}
                    </label>
                  </div>
                ))}
              </div>

              {/* Brands */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Brands</h4>
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox id={brand} />
                    <label htmlFor={brand} className="text-sm cursor-pointer">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <p className="text-sm text-muted-foreground">
                  {searchQuery
                    ? `Results for "${searchQuery}" (${products.length} found)`
                    : `Showing ${paginatedProducts.length} of ${products.length} products`}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Select defaultValue="popularity">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Most Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border border-border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <p>Loading products...</p>
            ) : paginatedProducts.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {paginatedProducts.map((product) => (
                  <div key={product.id} className="animate-fade-in">
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      description={product.description}
                      image={product.imageUrl}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>No products found</p>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  {[...Array(totalPages)].map((_, index) => (
                    <Button
                      key={index}
                      variant={currentPage === index + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* Mobile Filters Drawer */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
          <div className="bg-card w-64 h-full p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Filters</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            {/* Copy same filter content from sidebar */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-sm">Price Range</h4>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={1000}
                  min={0}
                  step={10}
                />
              </div>
              <div>
                <h4 className="font-medium text-sm">Categories</h4>
                {categories.map((cat) => (
                  <div key={cat} className="flex items-center space-x-2">
                    <Checkbox id={`mobile-${cat}`} />
                    <label htmlFor={`mobile-${cat}`}>{cat}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className="flex-1"
            onClick={() => setShowFilters(false)}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Products;
