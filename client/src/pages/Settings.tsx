import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Bell, User, Lock, LogOut } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";

export default function Settings() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: user?.name || "",
    company: "Your Startup",
  });

  const { data: profile } = trpc.settings.getProfile.useQuery();
  const { data: preferences } = trpc.settings.getNotificationPreferences.useQuery();
  const updateProfileMutation = trpc.settings.updateProfile.useMutation();
  const updatePreferencesMutation = trpc.settings.updateNotificationPreferences.useMutation();
  const logoutMutation = trpc.auth.logout.useMutation();

  const [notificationPrefs, setNotificationPrefs] = useState(preferences || {
    emailAlerts: true,
    weeklyReport: true,
    milestoneNotifications: true,
    churnAlerts: true,
    revenueAlerts: true,
  });

  const handleProfileUpdate = async () => {
    try {
      await updateProfileMutation.mutateAsync(formData);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handlePreferencesUpdate = async () => {
    try {
      await updatePreferencesMutation.mutateAsync(notificationPrefs);
      toast.success("Notification preferences updated");
    } catch (error) {
      toast.error("Failed to update preferences");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      setLocation("/");
    } catch (error) {
      toast.error("Failed to logout");
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
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex gap-4 border-b border-border"
        >
          {[
            { id: "profile", label: "Profile", icon: User },
            { id: "notifications", label: "Notifications", icon: Bell },
            { id: "security", label: "Security", icon: Lock },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-accent text-black"
                  : "border-transparent text-muted-foreground hover:text-black"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card border border-border p-8 max-w-2xl"
          >
            <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name</label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="rounded-none border-black/20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <Input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="rounded-none border-black/20 bg-black/5"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Company</label>
                <Input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="rounded-none border-black/20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Role</label>
                <Input
                  type="text"
                  value="Founder"
                  disabled
                  className="rounded-none border-black/20 bg-black/5"
                />
              </div>
              <Button
                onClick={handleProfileUpdate}
                disabled={updateProfileMutation.isPending}
                className="bg-black text-white hover:bg-black/90 rounded-none h-10"
              >
                {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card border border-border p-8 max-w-2xl"
          >
            <h2 className="text-2xl font-bold mb-6">Notification Preferences</h2>
            <div className="space-y-4">
              {[
                { key: "emailAlerts", label: "Email Alerts", description: "Receive important alerts via email" },
                { key: "weeklyReport", label: "Weekly Report", description: "Get weekly performance summary" },
                { key: "milestoneNotifications", label: "Milestone Notifications", description: "Celebrate your wins" },
                { key: "churnAlerts", label: "Churn Alerts", description: "Alert when churn rate increases" },
                { key: "revenueAlerts", label: "Revenue Alerts", description: "Notify on revenue milestones" },
              ].map((pref: any) => (
                <div key={pref.key} className="flex items-center justify-between p-4 border border-border/50">
                  <div>
                    <p className="font-semibold">{pref.label}</p>
                    <p className="text-sm text-muted-foreground">{pref.description}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationPrefs[pref.key as keyof typeof notificationPrefs] || false}
                    onChange={(e) =>
                      setNotificationPrefs({
                        ...notificationPrefs,
                        [pref.key]: e.target.checked,
                      })
                    }
                    className="w-5 h-5 cursor-pointer"
                  />
                </div>
              ))}
              <Button
                onClick={handlePreferencesUpdate}
                disabled={updatePreferencesMutation.isPending}
                className="bg-black text-white hover:bg-black/90 rounded-none h-10 mt-6"
              >
                {updatePreferencesMutation.isPending ? "Saving..." : "Save Preferences"}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card border border-border p-8 max-w-2xl"
          >
            <h2 className="text-2xl font-bold mb-6">Security</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold mb-2">Password</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Change your password to keep your account secure
                </p>
                <Button variant="outline" className="border-black rounded-none">
                  Change Password
                </Button>
              </div>
              <div className="border-t border-border pt-6">
                <h3 className="font-bold mb-2">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add an extra layer of security to your account
                </p>
                <Button variant="outline" className="border-black rounded-none">
                  Enable 2FA
                </Button>
              </div>
              <div className="border-t border-border pt-6">
                <h3 className="font-bold mb-2 text-red-600">Danger Zone</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Log out of all sessions or delete your account
                </p>
                <div className="flex gap-4">
                  <Button
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                    className="bg-accent text-white hover:bg-accent/90 rounded-none flex items-center gap-2"
                  >
                    <LogOut size={18} />
                    {logoutMutation.isPending ? "Logging out..." : "Logout"}
                  </Button>
                  <Button variant="outline" className="border-red-600 text-red-600 rounded-none">
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </DashboardLayout>
  );
}
