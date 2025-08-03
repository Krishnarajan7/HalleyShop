import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  BarChart3,
  CalendarClock,
  ShoppingBag,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#3B82F6"];

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    avgOrderValue: 0,
    mostSoldProduct: "N/A",
    recentOrders: 0,
    totalProfit: 0,
    revenueByCategory: [],
  });
  const [ordersTrend, setOrdersTrend] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/analytics", {
          credentials: "include",
        });
        const data = await res.json();

        setAnalytics({
          avgOrderValue: data.avgOrderValue || 0,
          mostSoldProduct: data.mostSoldProduct || "N/A",
          recentOrders: data.recentOrders || 0,
          totalProfit: data.totalProfit || 0,
          revenueByCategory: data.revenueByCategory?.length
            ? data.revenueByCategory.map((item) => ({
                name: item.category || "Other",
                value: item.revenue || 0,
              }))
            : [],
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching analytics:", err);
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  useEffect(() => {
    const fetchOrdersTrend = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/admin/orders-trend",
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        setOrdersTrend(data);
      } catch (err) {
        console.error("Error fetching orders trend:", err);
      }
    };

    fetchOrdersTrend();
  }, []);

  const items = [
    {
      label: "Avg. Order Value",
      value: `₹${(analytics.avgOrderValue || 0).toFixed(2)}`,
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
      value: `₹${(analytics.totalProfit || 0).toFixed(2)}`,
      icon: <TrendingUp className="h-6 w-6 text-green-600" />,
    },
  ];

  // Fallback mock data for pie chart
  const categoryData =
    analytics.revenueByCategory.length > 0
      ? analytics.revenueByCategory
      : [
          { name: "Electronics", value: 4000 },
          { name: "Clothing", value: 2500 },
          { name: "Home", value: 1500 },
          { name: "Books", value: 800 },
        ];

  // Fallback mock data for orders trend
  const ordersData =
    ordersTrend.length > 0
      ? ordersTrend
      : [
          { day: "Mon", count: 0 },
          { day: "Tue", count: 0 },
          { day: "Wed", count: 0 },
          { day: "Thu", count: 0 },
          { day: "Fri", count: 0 },
          { day: "Sat", count: 0 },
          { day: "Sun", count: 0 },
        ];

  return (
    <div className="space-y-8 px-2 md:px-6">
      <h1 className="text-2xl md:text-3xl font-bold">📈 Analytics</h1>
      <p className="text-muted-foreground text-sm mb-4">
        Detailed insights into orders, revenue, and customer behavior.
      </p>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {items.map((item, idx) => (
          <Card key={idx} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium text-muted-foreground">
                {item.label}
              </CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-xl font-semibold">
                {loading ? "Loading..." : item.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Category-wise Revenue Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center text-sm text-muted-foreground">
                Loading chart...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Orders Last 7 Days Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Orders Last 7 Days</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center text-sm text-muted-foreground">
                Loading chart...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ordersData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
