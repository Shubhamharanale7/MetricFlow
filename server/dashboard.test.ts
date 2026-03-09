import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

describe("Dashboard Procedures", () => {
  it("should return metrics with correct structure", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const metrics = await caller.dashboard.getMetrics();

    expect(metrics).toBeDefined();
    expect(metrics).toHaveProperty("mrr");
    expect(metrics).toHaveProperty("mrrChange");
    expect(metrics).toHaveProperty("dau");
    expect(metrics).toHaveProperty("dauChange");
    expect(metrics).toHaveProperty("cac");
    expect(metrics).toHaveProperty("cacChange");
    expect(metrics).toHaveProperty("ltv");
    expect(metrics).toHaveProperty("ltvChange");
    expect(metrics).toHaveProperty("conversionRate");
    expect(metrics).toHaveProperty("conversionChange");
  });

  it("should return revenue chart data", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const chartData = await caller.dashboard.getRevenueChart();

    expect(Array.isArray(chartData)).toBe(true);
    expect(chartData.length).toBeGreaterThan(0);
    expect(chartData[0]).toHaveProperty("month");
    expect(chartData[0]).toHaveProperty("revenue");
  });

  it("should return user growth chart data", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const chartData = await caller.dashboard.getUserGrowthChart();

    expect(Array.isArray(chartData)).toBe(true);
    expect(chartData.length).toBeGreaterThan(0);
    expect(chartData[0]).toHaveProperty("month");
    expect(chartData[0]).toHaveProperty("users");
  });

  it("should return engagement chart data", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const chartData = await caller.dashboard.getEngagementChart();

    expect(Array.isArray(chartData)).toBe(true);
    expect(chartData.length).toBeGreaterThan(0);
    expect(chartData[0]).toHaveProperty("week");
    expect(chartData[0]).toHaveProperty("engagement");
  });

  it("should return AI insights", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const insights = await caller.dashboard.getAIInsights();

    expect(insights).toBeDefined();
    expect(Array.isArray(insights.insights)).toBe(true);
    expect(Array.isArray(insights.recommendations)).toBe(true);
    expect(insights.insights.length).toBeGreaterThan(0);
    expect(insights.recommendations.length).toBeGreaterThan(0);
  });
});

describe("Reports Procedures", () => {
  it("should generate a report", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const report = await caller.reports.generateReport({
      startDate: "2026-01-01",
      endDate: "2026-03-09",
      format: "pdf",
    });

    expect(report).toBeDefined();
    expect(report.success).toBe(true);
    expect(report).toHaveProperty("reportId");
    expect(report).toHaveProperty("format");
    expect(report.format).toBe("pdf");
  });

  it("should return list of reports", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const reports = await caller.reports.getReports();

    expect(Array.isArray(reports)).toBe(true);
    if (reports.length > 0) {
      expect(reports[0]).toHaveProperty("id");
      expect(reports[0]).toHaveProperty("name");
      expect(reports[0]).toHaveProperty("date");
      expect(reports[0]).toHaveProperty("format");
    }
  });
});

describe("Growth Procedures", () => {
  it("should return trend analysis", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const trends = await caller.growth.getTrendAnalysis();

    expect(trends).toBeDefined();
    expect(trends).toHaveProperty("monthlyGrowth");
    expect(trends).toHaveProperty("revenueGrowthRate");
    expect(trends).toHaveProperty("churnRate");
    expect(Array.isArray(trends.customerAcquisitionTrend)).toBe(true);
  });
});

describe("Settings Procedures", () => {
  it("should return user profile", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const profile = await caller.settings.getProfile();

    expect(profile).toBeDefined();
    expect(profile).toHaveProperty("name");
    expect(profile).toHaveProperty("email");
    expect(profile).toHaveProperty("company");
    expect(profile).toHaveProperty("role");
  });

  it("should return notification preferences", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const prefs = await caller.settings.getNotificationPreferences();

    expect(prefs).toBeDefined();
    expect(prefs).toHaveProperty("emailAlerts");
    expect(prefs).toHaveProperty("weeklyReport");
    expect(prefs).toHaveProperty("milestoneNotifications");
    expect(prefs).toHaveProperty("churnAlerts");
    expect(prefs).toHaveProperty("revenueAlerts");
  });

  it("should update profile", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.settings.updateProfile({
      name: "Updated Name",
      company: "New Company",
    });

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
  });

  it("should update notification preferences", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.settings.updateNotificationPreferences({
      emailAlerts: false,
      weeklyReport: true,
    });

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
  });
});

describe("Chat Procedures", () => {
  it("should send a message and get response", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const response = await caller.chat.sendMessage({
      message: "What is my growth trend?",
    });

    expect(response).toBeDefined();
    expect(response).toHaveProperty("id");
    expect(response).toHaveProperty("message");
    expect(response).toHaveProperty("timestamp");
    expect(typeof response.message).toBe("string");
    expect(response.message.length).toBeGreaterThan(0);
  });

  it("should return chat history", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const history = await caller.chat.getChatHistory();

    expect(Array.isArray(history)).toBe(true);
    if (history.length > 0) {
      expect(history[0]).toHaveProperty("id");
      expect(history[0]).toHaveProperty("type");
      expect(history[0]).toHaveProperty("message");
      expect(history[0]).toHaveProperty("timestamp");
    }
  });
});

describe("Alerts Procedures", () => {
  it("should return alerts", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const alerts = await caller.alerts.getAlerts();

    expect(Array.isArray(alerts)).toBe(true);
    if (alerts.length > 0) {
      expect(alerts[0]).toHaveProperty("id");
      expect(alerts[0]).toHaveProperty("type");
      expect(alerts[0]).toHaveProperty("title");
      expect(alerts[0]).toHaveProperty("message");
      expect(alerts[0]).toHaveProperty("timestamp");
      expect(alerts[0]).toHaveProperty("read");
    }
  });

  it("should mark alert as read", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.alerts.markAsRead({
      alertId: "alert-1",
    });

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
  });

  it("should subscribe to alert", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.alerts.subscribeToAlert({
      type: "revenue",
      threshold: 10000,
    });

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.message).toContain("revenue");
  });
});

describe("Analytics Procedures", () => {
  it("should return advanced metrics", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const metrics = await caller.analytics.getAdvancedMetrics({
      dateRange: "30d",
    });

    expect(metrics).toBeDefined();
    expect(metrics).toHaveProperty("topEvents");
    expect(metrics).toHaveProperty("trafficSources");
    expect(Array.isArray(metrics.topEvents)).toBe(true);
    expect(Array.isArray(metrics.trafficSources)).toBe(true);
  });
});
