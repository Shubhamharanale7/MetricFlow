import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Target } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { trpc } from "@/lib/trpc";

const customerAcquisitionData = [
  { month: "Apr", acquisitions: 120 },
  { month: "May", acquisitions: 145 },
  { month: "Jun", acquisitions: 180 },
];

export default function Growth() {
  const { data: trendData } = trpc.growth.getTrendAnalysis.useQuery();

  const MetricCard = ({ icon: Icon, label, value, change, color }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border p-6"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-2">{label}</p>
          <h3 className="text-3xl font-bold mb-2">{value}</h3>
          <p className={`text-sm font-semibold ${change >= 0 ? "text-green-600" : "text-red-600"}`}>
            {change >= 0 ? "↑" : "↓"} {Math.abs(change)}% from last period
          </p>
        </div>
        <div className={`${color} p-3 text-white rounded`}>
          <Icon size={24} />
        </div>
      </div>
    </motion.div>
  );

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Growth Insights</h1>
          <p className="text-muted-foreground">Track your startup's growth metrics and identify opportunities</p>
        </div>

        {/* Key Growth Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            icon={TrendingUp}
            label="Monthly User Growth"
            value={trendData?.monthlyGrowth || "18"}
            change={18}
            color="bg-accent"
          />
          <MetricCard
            icon={TrendingUp}
            label="Revenue Growth Rate"
            value={trendData?.revenueGrowthRate || "22"}
            change={22}
            color="bg-blue-600"
          />
          <MetricCard
            icon={TrendingDown}
            label="Churn Rate"
            value={trendData?.churnRate || "2.5"}
            change={-2.5}
            color="bg-orange-600"
          />
          <MetricCard
            icon={Target}
            label="Customer Lifetime Value"
            value="$2,400"
            change={15}
            color="bg-green-600"
          />
        </div>

        {/* Customer Acquisition Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card border border-border p-6"
        >
          <h3 className="text-lg font-bold mb-6">Customer Acquisition Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trendData?.customerAcquisitionTrend || customerAcquisitionData}>
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
              <Bar dataKey="acquisitions" fill="var(--accent)" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Growth Opportunities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card border border-border p-6"
        >
          <h3 className="text-lg font-bold mb-6">Growth Opportunities</h3>
          <div className="space-y-4">
            {[
              {
                title: "Expand to Enterprise Segment",
                description: "Your product shows strong product-market fit. Consider targeting enterprise customers.",
                impact: "High",
              },
              {
                title: "Optimize Onboarding Flow",
                description: "Reduce time-to-value by streamlining your onboarding process.",
                impact: "Medium",
              },
              {
                title: "Launch Referral Program",
                description: "Leverage your satisfied customers to drive viral growth.",
                impact: "High",
              },
              {
                title: "Improve Retention",
                description: "Focus on reducing churn through better engagement and support.",
                impact: "Critical",
              },
            ].map((opportunity, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="border border-border p-4 hover:border-accent transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold">{opportunity.title}</h4>
                  <span className={`text-xs font-bold px-2 py-1 ${
                    opportunity.impact === "Critical" ? "bg-red-100 text-red-700" :
                    opportunity.impact === "High" ? "bg-accent/20 text-accent" :
                    "bg-blue-100 text-blue-700"
                  }`}>
                    {opportunity.impact}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{opportunity.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Retention Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card border border-border p-6"
        >
          <h3 className="text-lg font-bold mb-6">Retention Curve</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[
              { week: "W0", retention: 100 },
              { week: "W1", retention: 85 },
              { week: "W2", retention: 72 },
              { week: "W4", retention: 65 },
              { week: "W8", retention: 58 },
              { week: "W12", retention: 52 },
            ]}>
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
              <Line
                type="monotone"
                dataKey="retention"
                stroke="var(--accent)"
                strokeWidth={3}
                dot={{ fill: "var(--accent)", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
