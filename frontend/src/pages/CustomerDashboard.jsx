import { useState } from "react";
import {
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  Bell,
  CreditCard,
  Star,
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PageLoader from "@/components/ui/PageLoader";
import { toast } from "@/components/ui/sonner";

const MIN_LOADER_TIME = 700;

const recentOrders = [
  {
    id: "#ORD-001",
    date: "2024-01-15",
    status: "Delivered",
    total: 299.99,
    items: 3,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=60&h=60&fit=crop",
  },
  {
    id: "#ORD-002",
    date: "2024-01-12",
    status: "Shipped",
    total: 89.5,
    items: 1,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=60&h=60&fit=crop",
  },
];

const wishlistItems = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 199,
    originalPrice: 299,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
    inStock: true,
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
    inStock: false,
  },
];

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { user, logout } = useAuth();
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

  // This page should be wrapped in a ProtectedRoute to ensure only logged-in customers can access it.
  if (isLoading) return <PageLoader />;
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 space-y-2">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold">
                      JD
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      {user?.firstName} {user?.lastName}
                    </CardTitle>
                    <CardDescription>{user?.email}</CardDescription>
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
                <Package className="h-4 w-4 mr-3" />
                Overview
              </Button>
              <Button
                variant={activeTab === "orders" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("orders")}
              >
                <Package className="h-4 w-4 mr-3" />
                My Orders
              </Button>
              <Button
                variant={activeTab === "wishlist" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("wishlist")}
              >
                <Heart className="h-4 w-4 mr-3" />
                Wishlist
              </Button>
              <Button
                variant={activeTab === "addresses" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("addresses")}
              >
                <MapPin className="h-4 w-4 mr-3" />
                Addresses
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

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold mb-2">
                    Welcome back, {user?.firstName || "Guest"}!
                  </h1>
                  <p className="text-muted-foreground">
                    Here's what's happening with your account.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Orders
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">12</div>
                      <p className="text-xs text-muted-foreground">
                        +2 from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Spent
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$1,247</div>
                      <p className="text-xs text-muted-foreground">
                        +$189 from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Wishlist Items
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {wishlistItems.length}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Items saved
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center space-x-4"
                        >
                          <img
                            src={order.image}
                            alt="Order"
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{order.id}</p>
                                <p className="text-sm text-muted-foreground">
                                  {order.date} • {order.items} items
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">${order.total}</p>
                                <Badge
                                  variant={
                                    order.status === "Delivered"
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {order.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">My Orders</h1>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <Card key={order.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img
                              src={order.image}
                              alt="Order"
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-semibold">{order.id}</p>
                              <p className="text-sm text-muted-foreground">
                                Order placed on {order.date}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {order.items} items • ${order.total}
                              </p>
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            <Badge
                              variant={
                                order.status === "Delivered"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {order.status}
                            </Badge>
                            <div>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">My Wishlist</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {wishlistItems.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold mb-2">{item.name}</h3>
                            <div className="flex items-center gap-2 mb-3">
                              <span className="font-bold text-primary">
                                ${item.price}
                              </span>
                              {item.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  ${item.originalPrice}
                                </span>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" disabled={!item.inStock}>
                                {item.inStock ? "Add to Cart" : "Out of Stock"}
                              </Button>
                              <Button variant="outline" size="sm">
                                <Heart className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">My Addresses</h1>
                  <Button>Add New Address</Button>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">Home</h3>
                          <Badge>Default</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          123 Main Street
                          <br />
                          New York, NY 10001
                          <br />
                          United States
                        </p>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Account Settings</h1>
                <Tabs defaultValue="profile">
                  <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="notifications">
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">
                              First Name
                            </label>
                            <input
                              className="..."
                              defaultValue={user?.firstName || ""}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">
                              Last Name
                            </label>
                            <input
                              className="..."
                              defaultValue={user?.lastName || ""}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Email</label>
                          <input
                            className="..."
                            defaultValue={user?.email || ""}
                          />
                        </div>
                        <Button>Save Changes</Button>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="notifications">
                    <Card>
                      <CardHeader>
                        <CardTitle>Notification Preferences</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Notification settings will be available here.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="security">
                    <Card>
                      <CardHeader>
                        <CardTitle>Security Settings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Security settings will be available here.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CustomerDashboard;
