import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, BarChart3, CalendarClock, ShoppingBag } from "lucide-react";

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    avgOrderValue: 0,
    mostSoldProduct: "N/A",
    recentOrders: 0,
    profit: 0,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/analytics", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setAnalytics(data);
      } catch (err) {
        console.error("Error fetching analytics", err);
      }
    };

    fetchAnalytics();
  }, []);

  const items = [
    {
      label: "Avg. Order Value",
      value: `₹${analytics.avgOrderValue.toFixed(2)}`,
      icon: <BarChart3 className="h-6 w-6 text-indigo-600" />,
    },
    {
      label: "Most Sold Product",
      value: analytics.mostSoldProduct,
      icon: <ShoppingBag className="h-6 w-6 text-yellow-500" />,
    },
    {
      label: "Recent Orders (7d)",
      value: analytics.recentOrders,
      icon: <CalendarClock className="h-6 w-6 text-rose-500" />,
    },
    {
      label: "Total Profit",
      value: `₹${analytics.profit.toFixed(2)}`,
      icon: <TrendingUp className="h-6 w-6 text-emerald-500" />,
    },
  ];

  return (
    <div className="space-y-6 px-2 md:px-6">
      <h1 className="text-2xl md:text-3xl font-bold">Analytics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {items.map((item, idx) => (
          <Card key={idx}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium text-muted-foreground">
                {item.label}
              </CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-xl font-semibold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
