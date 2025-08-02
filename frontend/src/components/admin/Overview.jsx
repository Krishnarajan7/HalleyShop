import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
} from "lucide-react";

const AnimatedCount = ({ value }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const duration = 500;
    const stepTime = Math.abs(Math.floor(duration / (end || 1)));

    const timer = setInterval(() => {
      start += 1;
      setDisplay(start);
      if (start === end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{display.toLocaleString()}</span>;
};

const Overview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/stats", {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Failed to fetch admin stats");

        const data = await res.json();
        setStats(data);
        setLoading(false);
      } catch (err) {
        console.error(err.message);
      }
    };

    getStats();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">📊 Dashboard Overview</h1>
      <p className="text-muted-foreground text-sm">
        Real-time overview of your business metrics.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Total Revenue</CardTitle>
            <DollarSign className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "Loading..." : `₹${stats.totalRevenue.toLocaleString()}`}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Revenue generated from all orders
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Orders</CardTitle>
            <ShoppingCart className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : <AnimatedCount value={stats.totalOrders} />}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total number of orders placed
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Customers</CardTitle>
            <Users className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : <AnimatedCount value={stats.totalCustomers} />}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Registered and active customers
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Products</CardTitle>
            <Package className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : <AnimatedCount value={stats.totalProducts} />}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Products currently listed in store
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
