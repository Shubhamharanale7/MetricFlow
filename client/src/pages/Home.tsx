import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { TrendingUp, BarChart3, PieChart, Zap, Shield, Headphones } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-black/10"
      >
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent"></div>
            <span className="text-xl font-bold">MetricFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-semibold hover:text-accent transition">
              Features
            </a>
            <a href="#pricing" className="text-sm font-semibold hover:text-accent transition">
              Pricing
            </a>
            <a href="#benefits" className="text-sm font-semibold hover:text-accent transition">
              Benefits
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setLocation("/login")}
              variant="ghost"
              className="text-black hover:bg-black/5 rounded-none"
            >
              Sign In
            </Button>
            <Button
              onClick={() => setLocation("/signup")}
              className="bg-black text-white hover:bg-black/90 rounded-none"
            >
              Get Started
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 border-b border-black/10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container"
        >
          <motion.div variants={itemVariants} className="max-w-4xl">
            <div className="h-1 w-12 bg-accent mb-8"></div>
            <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
              Your startup's intelligence platform
            </h1>
            <p className="text-xl text-black/60 mb-8 max-w-2xl leading-relaxed">
              MetricFlow gives founders complete visibility into growth, revenue, and user behavior. Make data-driven decisions with real-time analytics and AI-powered insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => setLocation("/signup")}
                className="bg-black text-white hover:bg-black/90 h-12 rounded-none text-base font-semibold"
              >
                Start Free Trial
              </Button>
              <Button
                variant="outline"
                className="border-black text-black hover:bg-black/5 h-12 rounded-none text-base font-semibold"
              >
                View Demo
              </Button>
            </div>
          </motion.div>

          {/* Hero Visual - Asymmetric Grid */}
          <motion.div
            variants={itemVariants}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="bg-black/5 aspect-square rounded-none flex items-center justify-center">
              <BarChart3 size={48} className="text-accent" />
            </div>
            <div className="bg-accent aspect-square rounded-none flex items-center justify-center">
              <TrendingUp size={48} className="text-white" />
            </div>
            <div className="bg-black/5 aspect-square rounded-none flex items-center justify-center">
              <PieChart size={48} className="text-accent" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 border-b border-black/10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container"
        >
          <motion.div variants={itemVariants} className="mb-16">
            <div className="h-1 w-12 bg-accent mb-6"></div>
            <h2 className="text-5xl font-bold mb-4">Powerful Analytics</h2>
            <p className="text-lg text-black/60 max-w-2xl">
              Everything you need to understand your startup's performance in one beautiful dashboard.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Real-Time Metrics",
                description: "Monitor MRR, DAU, CAC, LTV, and conversion rates with live updates.",
              },
              {
                icon: BarChart3,
                title: "Interactive Charts",
                description: "Visualize revenue trends, user growth, and engagement patterns instantly.",
              },
              {
                icon: PieChart,
                title: "Growth Insights",
                description: "Track growth metrics and identify trends with advanced analytics.",
              },
              {
                icon: Zap,
                title: "AI Insights",
                description: "Get actionable recommendations powered by intelligent analysis.",
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level encryption and compliance with industry standards.",
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                description: "Dedicated support team ready to help your startup succeed.",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="border border-black/10 p-8 hover:border-accent transition-colors"
              >
                <feature.icon size={32} className="text-accent mb-4" />
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-black/60">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 border-b border-black/10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container"
        >
          <motion.div variants={itemVariants} className="mb-16">
            <div className="h-1 w-12 bg-accent mb-6"></div>
            <h2 className="text-5xl font-bold mb-4">Built for Founders</h2>
            <p className="text-lg text-black/60 max-w-2xl">
              MetricFlow is designed specifically for startup founders who need to move fast and make data-driven decisions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "Make Faster Decisions",
                description: "Access all your key metrics in seconds. No complex dashboards, just the data that matters.",
              },
              {
                title: "Impress Your Investors",
                description: "Generate professional reports and presentations to showcase your growth trajectory.",
              },
              {
                title: "Understand Your Users",
                description: "Deep dive into user behavior, retention patterns, and engagement metrics.",
              },
              {
                title: "Optimize Your Spend",
                description: "Track CAC and LTV to ensure your growth is profitable and sustainable.",
              },
            ].map((benefit, idx) => (
              <motion.div key={idx} variants={itemVariants} className="flex gap-6">
                <div className="w-12 h-12 bg-accent flex-shrink-0"></div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-black/60">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 border-b border-black/10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container"
        >
          <motion.div variants={itemVariants} className="mb-16">
            <div className="h-1 w-12 bg-accent mb-6"></div>
            <h2 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-black/60 max-w-2xl">
              Choose the plan that fits your startup's needs. No hidden fees, cancel anytime.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$99",
                description: "Perfect for early-stage startups",
                features: ["Up to 10,000 events/month", "Basic analytics", "Email support"],
              },
              {
                name: "Growth",
                price: "$299",
                description: "For scaling startups",
                features: ["Up to 100,000 events/month", "Advanced analytics", "AI insights", "Priority support"],
                highlight: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For high-growth companies",
                features: ["Unlimited events", "Custom integrations", "Dedicated support", "SLA guarantee"],
              },
            ].map((plan, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`border p-8 ${
                  plan.highlight ? "border-accent bg-accent/5" : "border-black/10"
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-2">{plan.price}</div>
                <p className="text-black/60 mb-6">{plan.description}</p>
                <Button
                  className={`w-full mb-6 h-10 rounded-none font-semibold ${
                    plan.highlight
                      ? "bg-black text-white hover:bg-black/90"
                      : "border border-black text-black hover:bg-black/5"
                  }`}
                  variant={plan.highlight ? "default" : "outline"}
                >
                  Get Started
                </Button>
                <ul className="space-y-3">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="text-sm text-black/60 flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-b border-black/10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container"
        >
          <motion.div
            variants={itemVariants}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="h-1 w-12 bg-accent mb-6 mx-auto"></div>
            <h2 className="text-5xl font-bold mb-6">Ready to scale your startup?</h2>
            <p className="text-xl text-black/60 mb-8">
              Join hundreds of founders using MetricFlow to make smarter decisions and grow faster.
            </p>
            <Button
              onClick={() => setLocation("/signup")}
              className="bg-black text-white hover:bg-black/90 h-12 px-8 rounded-none text-base font-semibold"
            >
              Start Your Free Trial
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-accent"></div>
                <span className="text-lg font-bold">MetricFlow</span>
              </div>
              <p className="text-white/60 text-sm">
                The analytics platform built for startup founders.
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Cookies</a></li>
              </ul>
            </motion.div>
          </div>
          <div className="border-t border-white/10 pt-8">
            <p className="text-center text-sm text-white/60">
              © 2026 MetricFlow. All rights reserved.
            </p>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
