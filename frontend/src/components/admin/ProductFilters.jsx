import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Filter } from "lucide-react";

const categories = [
  "Electronics", "Clothing", "Home & Garden", "Sports", "Books", "Beauty", "Toys", "Automotive"
];

const statuses = [
  { value: "available", label: "Available" },
  { value: "out-of-stock", label: "Out of Stock" }
];

const priceRanges = [
  { value: "0-25", label: "$0 - $25" },
  { value: "25-50", label: "$25 - $50" },
  { value: "50-100", label: "$50 - $100" },
  { value: "100-500", label: "$100 - $500" },
  { value: "500+", label: "$500+" }
];

const brands = [
  "Apple", "Samsung", "Nike", "Adidas", "Sony", "LG", "Canon", "HP"
];

const ProductFilters = ({ filters, onFilterChange, onClearFilters, activeFiltersCount }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="font-medium">Filters</span>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary">{activeFiltersCount}</Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-8 px-2 lg:px-3"
          >
            <X className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Category Filter */}
        <Select value={filters.category} onValueChange={(value) => onFilterChange("category", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select value={filters.status} onValueChange={(value) => onFilterChange("status", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {statuses.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Price Range Filter */}
        <Select value={filters.priceRange} onValueChange={(value) => onFilterChange("priceRange", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            {priceRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Brand Filter */}
        <Select value={filters.brand} onValueChange={(value) => onFilterChange("brand", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProductFilters;
