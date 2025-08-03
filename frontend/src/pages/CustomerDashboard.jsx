import { useState, useEffect } from "react";
import Overview from "@/components/customer/Overview";
import Orders from "@/components/customer/Orders";
import Wishlist from "@/components/customer/DashboardWishlist";
import Addresses from "@/components/customer/Addresses";
import Settings from "@/components/customer/Settings";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PageLoader from "@/components/ui/PageLoader";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Heart,
  MapPin,
  Settings as SettingsIcon,
  LogOut,
} from "lucide-react";

const MIN_LOADER_TIME = 700;

const CustomerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [ordersError, setOrdersError] = useState(null);
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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders/my", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrdersError("Failed to load orders.");
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, []);

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
                      {user?.firstName?.[0]}
                      {user?.lastName?.[0]}
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
                <SettingsIcon className="h-4 w-4 mr-3" />
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
              <Overview user={user} orders={orders} wishlistItems={wishlistItems} />
            )}
            {activeTab === "orders" && (
              <Orders orders={orders} loading={loadingOrders} error={ordersError} />
            )}
            {activeTab === "wishlist" && (
              <Wishlist wishlistItems={wishlistItems} />
            )}
            {activeTab === "addresses" && <Addresses user={user} />}
            {activeTab === "settings" && <Settings user={user} />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerDashboard;
