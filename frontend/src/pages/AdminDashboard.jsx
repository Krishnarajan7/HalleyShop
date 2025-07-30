import { useState } from "react";
import { BarChart3, Package, Users, ShoppingCart, DollarSign, TrendingUp, Settings, LogOut, Bell, Plus } from "lucide-react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import PageLoader from "@/components/ui/PageLoader";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";

const adminStats = {
  totalRevenue: 45231.89,
  totalOrders: 856,
  totalCustomers: 1205,
  totalProducts: 342
};

const recentOrders = [
  {
    id: "#ORD-001",
    customer: "John Doe",
    date: "2024-01-15",
    status: "Processing",
    total: 299.99
  },
  {
    id: "#ORD-002",
    customer: "Jane Smith", 
    date: "2024-01-15",
    status: "Shipped",
    total: 89.50
  },
  {
    id: "#ORD-003",
    customer: "Mike Johnson",
    date: "2024-01-14",
    status: "Delivered",
    total: 156.75
  }
];

const topProducts = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    sales: 145,
    revenue: 28755,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=60&h=60&fit=crop"
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    sales: 98,
    revenue: 29302,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=60&h=60&fit=crop"
  }
];

const MIN_LOADER_TIME = 700;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    const start = Date.now();
    try {
      await logout();
      const elapsed = Date.now() - start;
      const wait = Math.max(0, MIN_LOADER_TIME - elapsed);
      setTimeout(() => {
        navigate("/auth", { state: { loggedOut: true }, replace: true });
      }, wait);
    } catch (error) {
      toast.error("Logout failed");
      const elapsed = Date.now() - start;
      const wait = Math.max(0, MIN_LOADER_TIME - elapsed);
      setTimeout(() => setIsLoading(false), wait);
    }
  };

  if (isLoading) return <PageLoader />;

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
                    <span className="text-primary-foreground font-semibold">A</span>
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
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">Dashboard Overview</h1>
                    <p className="text-muted-foreground">Welcome to HalleyShop admin panel.</p>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Quick Action
                  </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${adminStats.totalRevenue.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Orders</CardTitle>
                      <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{adminStats.totalOrders}</div>
                      <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Customers</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{adminStats.totalCustomers}</div>
                      <p className="text-xs text-muted-foreground">+8.3% from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Products</CardTitle>
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{adminStats.totalProducts}</div>
                      <p className="text-xs text-muted-foreground">+5 new this week</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Orders */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentOrders.map((order) => (
                          <div key={order.id} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{order.id}</p>
                              <p className="text-sm text-muted-foreground">{order.customer}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">${order.total}</p>
                              <Badge variant={
                                order.status === "Delivered" ? "default" : 
                                order.status === "Shipped" ? "secondary" : "outline"
                              }>
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Top Products */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {topProducts.map((product) => (
                          <div key={product.id} className="flex items-center space-x-4">
                            <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                            <div className="flex-1">
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">${product.revenue.toLocaleString()}</p>
                              <p className="text-sm text-muted-foreground">Revenue</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">Order Management</h1>
                  <Button>Export Orders</Button>
                </div>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <Card key={order.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">{order.id}</p>
                            <p className="text-sm text-muted-foreground">Customer: {order.customer}</p>
                            <p className="text-sm text-muted-foreground">Date: {order.date}</p>
                          </div>
                          <div className="text-right space-y-2">
                            <p className="font-semibold">${order.total}</p>
                            <Badge variant={
                              order.status === "Delivered" ? "default" : 
                              order.status === "Shipped" ? "secondary" : "outline"
                            }>
                              {order.status}
                            </Badge>
                            <div>
                              <Button variant="outline" size="sm">View Details</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "products" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">Product Management</h1>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-muted-foreground">Product management interface will be available here.</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "customers" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Customer Management</h1>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-muted-foreground">Customer management interface will be available here.</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Analytics & Reports</h1>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-muted-foreground">Analytics dashboard will be available here.</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Admin Settings</h1>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-muted-foreground">Admin settings will be available here.</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;