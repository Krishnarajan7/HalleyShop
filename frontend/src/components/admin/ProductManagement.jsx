import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Upload } from "lucide-react";
import ProductForm from "./ProductForm";
import ProductModal from "./ProductModal";
import ProductFilters from "./ProductFilters";
import ProductSearch from "./ProductSearch";
import ProductPagination from "./ProductPagination";
import ProductUpload from "./ProductUpload";
import ProductTable from "./ProductTable";
import { useToast } from "@/components/ui/use-toast";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "all",
    status: "all",
    priceRange: "all",
    brand: "all",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { toast } = useToast();

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage,
        pageSize, // Include pageSize in the query
        search: searchTerm,
        sortBy: "createdAt",
        order: "desc",
        category: filters.category,
        status: filters.status,
        priceRange: filters.priceRange,
        brand: filters.brand,
      });

      const res = await fetch(`/api/products?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();

      setProducts(data.data.products || []);
      setTotalItems(data.data.totalItems || 0);
      setTotalPages(data.data.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const [activeTab, setActiveTab] = useState("products");

  useEffect(() => {
    if (activeTab === "products") {
      fetchProducts();
    }
  }, [currentPage, pageSize, searchTerm, filters, activeTab]);

  const handleAddProduct = async (productData) => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!res.ok) throw new Error("Failed to add product");
      console.log("Response:", await res.text()); // Moved here

      setCurrentPage(1);
      await fetchProducts();
      setShowForm(false);

      toast({
        title: "Product added",
        description: `${productData.name} was successfully added.`,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleUpdateProduct = async (productData) => {
    if (!editingProduct) return;

    try {
      const res = await fetch(`/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!res.ok) throw new Error("Failed to update product");

      setCurrentPage(1);
      await fetchProducts();
      setEditingProduct(null);
      setShowForm(false);

      toast({
        title: "Product updated",
        description: `${productData.name} was successfully updated.`,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = (productId) => {
    setProductToDelete(productId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      const res = await fetch(`/api/products/${productToDelete}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete product");

      toast({
        title: "Product deleted",
        description: `Product was successfully deleted.`,
      });

      setCurrentPage(1);
      await fetchProducts();
      setProductToDelete(null);
      setShowDeleteModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewProduct = (productId) => {
    console.log("View product:", productId);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleClearFilters = () => {
    setFilters({
      category: "all",
      status: "all",
      priceRange: "all",
      brand: "all",
    });
    setSearchTerm("");
    setCurrentPage(1);
  };

  const getActiveFiltersCount = () => {
    return (
      Object.values(filters).filter((value) => value !== "all").length +
      (searchTerm ? 1 : 0)
    );
  };

  const handleImageUpload = (files) => {
    console.log("Uploading images:", files);

    toast({
      title: "Images Uploaded",
      description: "Images were successfully uploaded.",
    });
  };

  const handleCSVUpload = (file) => {
    console.log("Importing CSV:", file);
    toast({
      title: "CSV Imported",
      description: "Products were imported from CSV file.",
    });
  };

  const handleExportCSV = () => {
    console.log("Exporting CSV");
    toast({
      title: "CSV Exported",
      description: "Products were exported to CSV file.",
    });
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <ProductForm
          initialData={editingProduct || undefined}
          onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          isEditing={!!editingProduct}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowForm(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="upload">Bulk Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          <ProductSearch value={searchTerm} onChange={setSearchTerm} />
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            activeFiltersCount={getActiveFiltersCount()}
          />
          <Card>
            <CardHeader>
              <CardTitle>Products ({totalItems})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ProductTable
                products={products}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
                onView={handleViewProduct}
              />
            </CardContent>
          </Card>
          {totalPages > 1 && (
            <ProductPagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={totalItems}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          )}
        </TabsContent>

        <TabsContent value="upload">
          <ProductUpload
            onImageUpload={handleImageUpload}
            onCSVUpload={handleCSVUpload}
            onExportCSV={handleExportCSV}
          />
        </TabsContent>
      </Tabs>

      <ProductModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
};

export default ProductManagement;
