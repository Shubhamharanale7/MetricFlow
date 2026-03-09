import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { TrendingUp, Users, DollarSign, Activity, Target } from "lucide-react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { AIInsightsChat } from "@/components/AIInsightsChat";
import { trpc } from "@/lib/trpc";

const revenueData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 5200 },
  { month: "Mar", revenue: 6800 },
  { month: "Apr", revenue: 8200 },
  { month: "May", revenue: 9800 },
  { month: "Jun", revenue: 12000 },
];

const userGrowthData = [
  { month: "Jan", users: 2400 },
  { month: "Feb", users: 3200 },
  { month: "Mar", users: 4100 },
  { month: "Apr", users: 5200 },
  { month: "May", users: 6800 },
  { month: "Jun", users: 8200 },
];

const engagementData = [
  { week: "W1", engagement: 65 },
  { week: "W2", engagement: 72 },
  { week: "W3", engagement: 68 },
  { week: "W4", engagement: 78 },
];

const KPICard = ({ icon: Icon, label, value, change, color = "bg-accent" }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-card border border-border p-6 hover:shadow-lg transition-shadow"
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-muted-foreground mb-2">{label}</p>
        <h3 className="text-3xl font-bold mb-2">{value}</h3>
        <p className={`text-sm font-semibold ${change >= 0 ? "text-green-600" : "text-red-600"}`}>
          {change >= 0 ? "↑" : "↓"} {Math.abs(change)}% from last month
        </p>
      </div>
      <div className={`${color} p-3 text-white rounded`}>
        <Icon size={24} />
      </div>
    </div>
  </motion.div>
);

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your startup's performance overview.</p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <KPICard
            icon={DollarSign}
            label="Monthly Recurring Revenue"
            value="$12,000"
            change={15}
            color="bg-accent"
          />
          <KPICard
            icon={Users}
            label="Daily Active Users"
            value="8,200"
            change={12}
            color="bg-blue-600"
          />
          <KPICard
            icon={Target}
            label="Customer Acquisition Cost"
            value="$45"
            change={-8}
            color="bg-purple-600"
          />
          <KPICard
            icon={TrendingUp}
            label="Customer Lifetime Value"
            value="$2,400"
            change={22}
            color="bg-green-600"
          />
          <KPICard
            icon={Activity}
            label="Conversion Rate"
            value="3.2%"
            change={5}
            color="bg-orange-600"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card border border-border p-6"
          >
            <h3 className="text-lg font-bold mb-4">Revenue Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 0,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--accent)"
                  strokeWidth={3}
                  dot={{ fill: "var(--accent)", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* User Growth Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card border border-border p-6"
          >
            <h3 className="text-lg font-bold mb-4">User Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 0,
                  }}
                />
                <Bar dataKey="users" fill="var(--accent)" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Engagement Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card border border-border p-6"
        >
          <h3 className="text-lg font-bold mb-4">User Engagement</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="week" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 0,
                }}
              />
              <Area
                type="monotone"
                dataKey="engagement"
                fill="var(--accent)"
                stroke="var(--accent)"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* AI Insights Chat and Key Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AIInsightsChat />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-card border border-border p-6"
          >
            <h3 className="text-lg font-bold mb-4">AI Insights</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-accent pl-4">
                <p className="font-semibold text-sm mb-1">User Growth Acceleration</p>
                <p className="text-sm text-muted-foreground">
                  Your user growth increased 14% this week. Your onboarding improvements are working!
                </p>
              </div>
              <div className="border-l-4 border-green-600 pl-4">
                <p className="font-semibold text-sm mb-1">Strong Monetization Trend</p>
                <p className="text-sm text-muted-foreground">
                  Revenue per user is up 8% compared to last month - excellent monetization.
                </p>
              </div>
              <div className="border-l-4 border-orange-600 pl-4">
                <p className="font-semibold text-sm mb-1">Retention Alert</p>
                <p className="text-sm text-muted-foreground">
                  Retention dropped 3% after the latest feature release. Consider investigating user feedback.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
