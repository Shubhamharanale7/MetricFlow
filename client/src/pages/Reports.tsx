import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Download, FileText, Calendar } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Reports() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [format, setFormat] = useState<"pdf" | "excel">("pdf");

  const generateReportMutation = trpc.reports.generateReport.useMutation();
  const { data: reports } = trpc.reports.getReports.useQuery();

  const handleGenerateReport = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates");
      return;
    }

    try {
      await generateReportMutation.mutateAsync({
        startDate,
        endDate,
        format,
      });
      toast.success(`${format.toUpperCase()} report generated successfully`);
    } catch (error) {
      toast.error("Failed to generate report");
    }
  };

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
          <h1 className="text-4xl font-bold mb-2">Reports</h1>
          <p className="text-muted-foreground">Generate and manage your performance reports</p>
        </div>

        {/* Generate Report Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card border border-border p-8"
        >
          <h2 className="text-2xl font-bold mb-6">Generate New Report</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-border px-4 py-2 rounded-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-border px-4 py-2 rounded-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as "pdf" | "excel")}
                className="w-full border border-border px-4 py-2 rounded-none bg-white"
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleGenerateReport}
                disabled={generateReportMutation.isPending}
                className="w-full bg-black text-white hover:bg-black/90 rounded-none h-10"
              >
                {generateReportMutation.isPending ? "Generating..." : "Generate Report"}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Previous Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card border border-border p-8"
        >
          <h2 className="text-2xl font-bold mb-6">Previous Reports</h2>
          {reports && reports.length > 0 ? (
            <div className="space-y-4">
              {reports.map((report: any) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-between p-4 border border-border/50 hover:border-accent transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-black/10 p-3 rounded">
                      <FileText size={24} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold">{report.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(report.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-black rounded-none flex items-center gap-2"
                  >
                    <Download size={18} />
                    Download
                  </Button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No reports generated yet</p>
            </div>
          )}
        </motion.div>

        {/* Report Templates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card border border-border p-8"
        >
          <h2 className="text-2xl font-bold mb-6">Quick Report Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Weekly Summary",
                description: "Last 7 days performance overview",
                icon: Calendar,
              },
              {
                title: "Monthly Analysis",
                description: "Detailed month-over-month comparison",
                icon: FileText,
              },
              {
                title: "Quarterly Review",
                description: "Comprehensive quarterly insights",
                icon: Download,
              },
            ].map((template, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="border border-border p-6 text-left hover:border-accent transition-colors"
              >
                <template.icon size={32} className="text-accent mb-4" />
                <h3 className="font-bold mb-2">{template.title}</h3>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
