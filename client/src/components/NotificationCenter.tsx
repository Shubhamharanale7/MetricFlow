import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Bell, X, AlertCircle, TrendingUp, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: alerts, refetch } = trpc.alerts.getAlerts.useQuery();
  const markAsReadMutation = trpc.alerts.markAsRead.useMutation();

  const handleMarkAsRead = async (alertId: string) => {
    try {
      await markAsReadMutation.mutateAsync({ alertId });
      refetch();
    } catch (error) {
      console.error("Failed to mark alert as read", error);
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "revenue":
        return <DollarSign size={20} className="text-accent" />;
      case "growth":
        return <TrendingUp size={20} className="text-green-600" />;
      default:
        return <AlertCircle size={20} className="text-blue-600" />;
    }
  };

  const unreadCount = alerts?.filter((a: any) => !a.read).length || 0;

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-black/5 rounded transition-colors"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-80 bg-card border border-border shadow-lg z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-bold">Notifications</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-black/5 rounded"
              >
                <X size={18} />
              </button>
            </div>

            {/* Alerts List */}
            <div className="max-h-96 overflow-y-auto">
              {alerts && alerts.length > 0 ? (
                <div className="divide-y divide-border">
                  {alerts.map((alert: any) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`p-4 hover:bg-black/2 transition-colors cursor-pointer ${
                        !alert.read ? "bg-accent/5" : ""
                      }`}
                      onClick={() => handleMarkAsRead(alert.id)}
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0">
                          {getAlertIcon(alert.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm">{alert.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {alert.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(alert.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                        {!alert.read && (
                          <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-1"></div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <Bell size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No notifications yet</p>
                </div>
              )}
            </div>

            {/* Footer */}
            {alerts && alerts.length > 0 && (
              <div className="border-t border-border p-3">
                <Button
                  variant="ghost"
                  className="w-full text-sm text-accent hover:bg-accent/10 rounded-none"
                >
                  View All Notifications
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
