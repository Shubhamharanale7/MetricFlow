import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Dashboard metrics
  dashboard: router({
    getMetrics: protectedProcedure.query(async ({ ctx }) => {
      // Return mock metrics data for now
      return {
        mrr: 12000,
        mrrChange: 15,
        dau: 8200,
        dauChange: 12,
        cac: 45,
        cacChange: -8,
        ltv: 2400,
        ltvChange: 22,
        conversionRate: 3.2,
        conversionChange: 5,
      };
    }),

    getRevenueChart: protectedProcedure.query(async ({ ctx }) => {
      return [
        { month: "Jan", revenue: 4000 },
        { month: "Feb", revenue: 5200 },
        { month: "Mar", revenue: 6800 },
        { month: "Apr", revenue: 8200 },
        { month: "May", revenue: 9800 },
        { month: "Jun", revenue: 12000 },
      ];
    }),

    getUserGrowthChart: protectedProcedure.query(async ({ ctx }) => {
      return [
        { month: "Jan", users: 2400 },
        { month: "Feb", users: 3200 },
        { month: "Mar", users: 4100 },
        { month: "Apr", users: 5200 },
        { month: "May", users: 6800 },
        { month: "Jun", users: 8200 },
      ];
    }),

    getEngagementChart: protectedProcedure.query(async ({ ctx }) => {
      return [
        { week: "W1", engagement: 65 },
        { week: "W2", engagement: 72 },
        { week: "W3", engagement: 68 },
        { week: "W4", engagement: 78 },
      ];
    }),

    getAIInsights: protectedProcedure.query(async ({ ctx }) => {
      return {
        insights: [
          "User growth increased 14% this week - your onboarding improvements are working!",
          "Revenue per user is up 8% compared to last month - strong monetization trend.",
          "Retention dropped 3% after the latest feature release - consider investigating user feedback.",
        ],
        recommendations: [
          "Focus on reducing CAC by optimizing your top-performing marketing channels",
          "Implement A/B testing on your conversion funnel to improve the 3.2% rate",
          "Schedule a retention analysis to understand the recent dip",
        ],
      };
    }),
  }),

  // Analytics
  analytics: router({
    getAdvancedMetrics: protectedProcedure
      .input(z.object({ dateRange: z.string().optional() }))
      .query(async ({ ctx, input }) => {
        return {
          topEvents: [
            { event: "User Signup", count: 450, trend: "+12%" },
            { event: "Feature Usage", count: 2300, trend: "+8%" },
            { event: "Payment Completed", count: 180, trend: "+15%" },
          ],
          trafficSources: [
            { source: "Organic", percentage: 45 },
            { source: "Paid", percentage: 35 },
            { source: "Referral", percentage: 20 },
          ],
        };
      }),
  }),

  // Reports
  reports: router({
    generateReport: protectedProcedure
      .input(z.object({ startDate: z.string(), endDate: z.string(), format: z.enum(["pdf", "excel"]) }))
      .mutation(async ({ ctx, input }) => {
        // In a real app, this would generate actual PDF/Excel files
        return {
          success: true,
          reportId: "report-" + Date.now(),
          format: input.format,
          url: `/reports/report-${Date.now()}.${input.format === "pdf" ? "pdf" : "xlsx"}`,
        };
      }),

    getReports: protectedProcedure.query(async ({ ctx }) => {
      return [
        {
          id: "report-1",
          name: "Weekly Performance Summary",
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          format: "pdf",
        },
        {
          id: "report-2",
          name: "Monthly Growth Analysis",
          date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          format: "excel",
        },
      ];
    }),
  }),

  // Growth insights
  growth: router({
    getTrendAnalysis: protectedProcedure.query(async ({ ctx }) => {
      return {
        monthlyGrowth: 18,
        revenueGrowthRate: 22,
        churnRate: 2.5,
        customerAcquisitionTrend: [
          { month: "Apr", acquisitions: 120 },
          { month: "May", acquisitions: 145 },
          { month: "Jun", acquisitions: 180 },
        ],
      };
    }),
  }),

  // Settings
  settings: router({
    getProfile: protectedProcedure.query(async ({ ctx }) => {
      return {
        name: ctx.user?.name || "User",
        email: ctx.user?.email || "user@example.com",
        company: "Your Startup",
        role: "Founder",
      };
    }),

    updateProfile: protectedProcedure
      .input(z.object({ name: z.string(), company: z.string() }))
      .mutation(async ({ ctx, input }) => {
        return { success: true, message: "Profile updated successfully" };
      }),

    getNotificationPreferences: protectedProcedure.query(async ({ ctx }) => {
      return {
        emailAlerts: true,
        weeklyReport: true,
        milestoneNotifications: true,
        churnAlerts: true,
        revenueAlerts: true,
      };
    }),

    updateNotificationPreferences: protectedProcedure
      .input(z.object({
        emailAlerts: z.boolean().optional(),
        weeklyReport: z.boolean().optional(),
        milestoneNotifications: z.boolean().optional(),
        churnAlerts: z.boolean().optional(),
        revenueAlerts: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return { success: true, message: "Notification preferences updated" };
      }),
  }),

  // AI Chat for insights
  chat: router({
    sendMessage: protectedProcedure
      .input(z.object({ message: z.string() }))
      .mutation(async ({ ctx, input }) => {
        // In a real app, this would call the LLM
        const mockResponses = [
          "Based on your metrics, your user growth is accelerating. Consider investing in retention strategies.",
          "Your CAC is $45 and LTV is $2,400 - a healthy 53:1 ratio. Keep optimizing your marketing channels.",
          "Revenue is trending up 15% month-over-month. At this rate, you'll hit $150K MRR in 6 months.",
          "Your conversion rate of 3.2% is above industry average. Focus on scaling what's working.",
        ];
        const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
        return {
          id: "msg-" + Date.now(),
          message: response,
          timestamp: new Date(),
        };
      }),

    getChatHistory: protectedProcedure.query(async ({ ctx }) => {
      return [
        {
          id: "msg-1",
          type: "user",
          message: "What's my growth trend?",
          timestamp: new Date(Date.now() - 3600000),
        },
        {
          id: "msg-2",
          type: "assistant",
          message: "Your user growth increased 12% this month. Revenue is up 15%.",
          timestamp: new Date(Date.now() - 3500000),
        },
      ];
    }),
  }),

  // Email alerts
  alerts: router({
    getAlerts: protectedProcedure.query(async ({ ctx }) => {
      return [
        {
          id: "alert-1",
          type: "revenue",
          title: "Revenue Milestone Reached",
          message: "You've reached $10K MRR!",
          timestamp: new Date(Date.now() - 86400000),
          read: false,
        },
        {
          id: "alert-2",
          type: "growth",
          title: "User Growth Spike",
          message: "DAU increased 25% in the last 24 hours",
          timestamp: new Date(Date.now() - 172800000),
          read: true,
        },
      ];
    }),

    markAsRead: protectedProcedure
      .input(z.object({ alertId: z.string() }))
      .mutation(async ({ ctx, input }) => {
        return { success: true };
      }),

    subscribeToAlert: protectedProcedure
      .input(z.object({
        type: z.enum(["revenue", "churn", "growth", "weekly_report"]),
        threshold: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return { success: true, message: `Subscribed to ${input.type} alerts` };
      }),
  }),
});

export type AppRouter = typeof appRouter;
