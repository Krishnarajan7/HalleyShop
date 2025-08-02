import { useState } from "react";
import {
  BarChart3,
  Package,
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Settings,
  LogOut,
  Bell,
  Plus,
} from "lucide-react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Overview from "@/components/admin/Overview";
import Analytics from "@/components/admin/Analytics";
import AdminSettings from "@/components/admin/AdminSettings";
import { Separator } from "@/components/ui/separator";
import ProductManagement from "@/components/admin/ProductManagement";
import CustomerManagement from "@/components/admin/customers/CustomerManagement";
import OrderManagement from "@/components/admin/orders/OrderManagement";


const adminStats = {
  totalRevenue: 45231.89,
  totalOrders: 856,
  totalCustomers: 1205,
  totalProducts: 342,
};

const recentOrders = [
  {
    id: "#ORD-001",
    customer: "John Doe",
    date: "2024-01-15",
    status: "Processing",
    total: 299.99,
  },
  {
    id: "#ORD-002",
    customer: "Jane Smith",
    date: "2024-01-15",
    status: "Shipped",
    total: 89.5,
  },
  {
    id: "#ORD-003",
    customer: "Mike Johnson",
    date: "2024-01-14",
    status: "Delivered",
    total: 156.75,
  },
];

const topProducts = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    sales: 145,
    revenue: 28755,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=60&h=60&fit=crop",
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    sales: 98,
    revenue: 29302,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=60&h=60&fit=crop",
  },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = () => {
    // For now, just redirect to home - will be connected to Supabase later
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Admin Sidebar */}
          <div className="lg:w-64 space-y-2">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold">
                      A
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">Admin Panel</CardTitle>
                    <CardDescription>HalleyShop Management</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <div className="space-y-1">
              <Button
                variant={activeTab === "overview" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("overview")}
              >
                <BarChart3 className="h-4 w-4 mr-3" />
                Overview
              </Button>
              <Button
                variant={activeTab === "orders" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("orders")}
              >
                <ShoppingCart className="h-4 w-4 mr-3" />
                Orders
              </Button>
              <Button
                variant={activeTab === "products" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("products")}
              >
                <Package className="h-4 w-4 mr-3" />
                Products
              </Button>
              <Button
                variant={activeTab === "customers" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("customers")}
              >
                <Users className="h-4 w-4 mr-3" />
                Customers
              </Button>
              <Button
                variant={activeTab === "analytics" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("analytics")}
              >
                <TrendingUp className="h-4 w-4 mr-3" />
                Analytics
              </Button>
              <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="h-4 w-4 mr-3" />
                Settings
              </Button>
              <Separator className="my-2" />
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-3" />
                Logout
              </Button>
            </div>
          </div>

          {/* Main Admin Content */}
          <div className="flex-1">
            {activeTab === "overview" && <Overview />}
            {activeTab === "orders" && <OrderManagement />}
            {activeTab === "products" && <ProductManagement />}
            {activeTab === "customers" && (
              <div className="space-y-6">
                <CustomerManagement />
              </div>
            )}
            {activeTab === "analytics" && <Analytics />}
            {activeTab === "settings" && <AdminSettings />}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
