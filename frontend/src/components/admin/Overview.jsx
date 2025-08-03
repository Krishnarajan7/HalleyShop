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
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

// Animated counter for stats
const AnimatedCount = ({ value }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    const duration = 800;
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

  // Mock chart data
  const mockTrends = {
    revenue: [
      { date: "Jul 1", amount: 500 },
      { date: "Jul 2", amount: 1200 },
      { date: "Jul 3", amount: 800 },
      { date: "Jul 4", amount: 1500 },
      { date: "Jul 5", amount: 2000 },
      { date: "Jul 6", amount: 1800 },
      { date: "Jul 7", amount: 2200 },
    ],
    orders: [
      { day: "Mon", count: 5 },
      { day: "Tue", count: 8 },
      { day: "Wed", count: 6 },
      { day: "Thu", count: 10 },
      { day: "Fri", count: 7 },
      { day: "Sat", count: 9 },
      { day: "Sun", count: 4 },
    ],
  };

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

  const summaryCards = [
    {
      label: "Total Revenue",
      value: stats?.totalRevenue || 0,
      icon: <DollarSign className="h-6 w-6 text-green-500" />,
      change: "+12%",
      isPositive: true,
    },
    {
      label: "Orders",
      value: stats?.totalOrders || 0,
      icon: <ShoppingCart className="h-6 w-6 text-blue-500" />,
      change: "-3%",
      isPositive: false,
    },
    {
      label: "Customers",
      value: stats?.totalCustomers || 0,
      icon: <Users className="h-6 w-6 text-yellow-500" />,
      change: "+8%",
      isPositive: true,
    },
    {
      label: "Products",
      value: stats?.totalProducts || 0,
      icon: <Package className="h-6 w-6 text-purple-500" />,
      change: "+2%",
      isPositive: true,
    },
  ];

  return (
    <div className="space-y-8 px-4 md:px-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">📊 Dashboard Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Real-time business performance metrics and trends.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, idx) => (
          <Card key={idx} className="hover:shadow-md transition-shadow p-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{card.label}</CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "..." : (
                  <>
                    {card.label === "Total Revenue" ? `₹` : ""}
                    <AnimatedCount value={card.value} />
                  </>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs mt-1">
                {card.isPositive ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
                <span className={card.isPositive ? "text-green-500" : "text-red-500"}>
                  {card.change} from last week
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={mockTrends.revenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#4F46E5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Orders Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Orders (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={mockTrends.orders}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
