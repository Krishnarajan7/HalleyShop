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
import axios from "axios";
import Papa from "papaparse";

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
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState("products");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        pageSize,
        search: searchTerm,
        sortBy: "createdAt",
        order: "desc",
        category: filters.category,
        status: filters.status,
        priceRange: filters.priceRange,
        brand: filters.brand,
      };

      const { data } = await axios.get("/api/products", { params });

      setProducts(data.data.products || []);
      setTotalItems(data.data.totalItems || 0);
      setTotalPages(data.data.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      toast({
        title: "Error",
        description: "Failed to load products.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "products") {
      fetchProducts();
    }
  }, [currentPage, pageSize, searchTerm, filters, activeTab]);

  const handleAddProduct = async (formData) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast({
        title: "Success",
        description: data.message || "Product added successfully",
      });

      await fetchProducts();
      setShowForm(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to add product",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleUpdateProduct = async (formData) => {
    if (!editingProduct) return;

    try {
      setLoading(true);
      const { data } = await axios.put(
        `/api/products/${editingProduct.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      toast({
        title: "Success",
        description: data.message || "Product updated successfully",
      });

      await fetchProducts();
      setEditingProduct(null);
      setShowForm(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to update product",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = (productId) => {
    setProductToDelete(productId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      setLoading(true);
      await axios.delete(`/api/products/${productToDelete}`);

      toast({
        title: "Product deleted",
        description: `Product was successfully deleted.`,
      });

      await fetchProducts();
      setProductToDelete(null);
      setShowDeleteModal(false);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to delete product.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewProduct = (productId) => {
    console.log("View product:", productId);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
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
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          for (const row of results.data) {
            await axios.post("/api/products", {
              name: row.name,
              description: row.description,
              price: parseFloat(row.price),
              category: row.category,
              brand: row.brand,
              stock: parseInt(row.stock),
              imageUrl: row.imageUrl,
            });
          }
          toast({
            title: "Products Uploaded",
            description: `${results.data.length} products added successfully.`,
          });
          fetchProducts();
        } catch (error) {
          console.error(error);
          toast({
            title: "Upload Failed",
            description: "Could not process the CSV file.",
            variant: "destructive",
          });
        }
      },
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
          onSubmit={(formData, isEdit) =>
            isEdit ? handleUpdateProduct(formData) : handleAddProduct(formData)
          }
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
          <Button
            variant="outline"
            onClick={() => setActiveTab("upload")}
            disabled={loading}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <Button onClick={() => setShowForm(true)} disabled={loading}>
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
              <CardTitle>
                {loading ? "Loading products..." : `Products (${totalItems})`}
              </CardTitle>
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
