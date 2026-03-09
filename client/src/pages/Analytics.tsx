import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Filter, Download } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const trafficData = [
  { source: "Organic", value: 45, color: "#FF0000" },
  { source: "Paid", value: 35, color: "#000000" },
  { source: "Referral", value: 20, color: "#F5F5F5" },
];

const conversionFunnel = [
  { stage: "Visitors", count: 10000 },
  { stage: "Signups", count: 2500 },
  { stage: "Active Users", count: 1200 },
  { stage: "Paying Customers", count: 180 },
];

export default function Analytics() {
  const [dateRange, setDateRange] = useState("30d");
  const [selectedMetric, setSelectedMetric] = useState("all");

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
          <h1 className="text-4xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">Deep dive into your user behavior and engagement patterns</p>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card border border-border p-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
        >
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-border px-4 py-2 rounded-none bg-white"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Metric</label>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="border border-border px-4 py-2 rounded-none bg-white"
              >
                <option value="all">All Metrics</option>
                <option value="users">Users</option>
                <option value="revenue">Revenue</option>
                <option value="engagement">Engagement</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="bg-black text-white hover:bg-black/90 rounded-none flex items-center gap-2">
              <Filter size={18} />
              Filter
            </Button>
            <Button variant="outline" className="border-black rounded-none flex items-center gap-2">
              <Download size={18} />
              Export
            </Button>
          </div>
        </motion.div>

        {/* Top Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card border border-border p-6"
        >
          <h3 className="text-lg font-bold mb-6">Top User Actions</h3>
          <div className="space-y-4">
            {[
              { event: "User Signup", count: 450, trend: "+12%" },
              { event: "Feature Usage", count: 2300, trend: "+8%" },
              { event: "Payment Completed", count: 180, trend: "+15%" },
              { event: "Support Ticket", count: 45, trend: "-3%" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border border-border/50">
                <div>
                  <p className="font-semibold">{item.event}</p>
                  <p className="text-sm text-muted-foreground">{item.count} events</p>
                </div>
                <p className={`font-bold ${item.trend.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                  {item.trend}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Traffic Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <div className="bg-card border border-border p-6">
            <h3 className="text-lg font-bold mb-6">Traffic Sources</h3>
            <div className="space-y-4">
              {trafficData.map((source, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold">{source.source}</p>
                    <p className="text-sm text-muted-foreground">{source.value}%</p>
                  </div>
                  <div className="w-full bg-black/10 h-2">
                    <div
                      className="bg-accent h-full"
                      style={{ width: `${source.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Funnel */}
          <div className="bg-card border border-border p-6">
            <h3 className="text-lg font-bold mb-6">Conversion Funnel</h3>
            <div className="space-y-3">
              {conversionFunnel.map((stage, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="flex-1 bg-black/10 p-3">
                    <p className="font-semibold text-sm">{stage.stage}</p>
                    <p className="text-xs text-muted-foreground">{stage.count.toLocaleString()}</p>
                  </div>
                  {idx < conversionFunnel.length - 1 && (
                    <p className="text-xs font-bold text-accent">
                      {Math.round((conversionFunnel[idx + 1].count / stage.count) * 100)}%
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Session Duration Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card border border-border p-6"
        >
          <h3 className="text-lg font-bold mb-6">Average Session Duration</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[
              { day: "Mon", duration: 8.5 },
              { day: "Tue", duration: 9.2 },
              { day: "Wed", duration: 8.8 },
              { day: "Thu", duration: 10.1 },
              { day: "Fri", duration: 11.3 },
              { day: "Sat", duration: 7.2 },
              { day: "Sun", duration: 6.8 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" />
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
                dataKey="duration"
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
