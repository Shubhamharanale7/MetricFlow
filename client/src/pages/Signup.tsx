import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useLocation } from "wouter";
import { getLoginUrl } from "@/const";
import { Mail } from "lucide-react";

export default function Signup() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOAuthSignup = () => {
    window.location.href = getLoginUrl();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Red accent line */}
        <div className="h-1 w-12 bg-accent mb-8"></div>

        <h1 className="text-4xl font-bold mb-2">Get Started</h1>
        <p className="text-muted-foreground mb-8">Create your MetricFlow account today</p>

        {/* OAuth Button */}
        <Button
          onClick={handleOAuthSignup}
          className="w-full bg-black text-white hover:bg-black/90 mb-6 h-12 rounded-none flex items-center justify-center gap-2"
        >
          <Mail size={18} />
          Sign up with Manus
        </Button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-muted-foreground">Or sign up with email</span>
          </div>
        </div>

        {/* Signup Form */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Full Name</label>
            <Input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleInputChange}
              className="rounded-none border-black/20"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <Input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className="rounded-none border-black/20"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <Input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              className="rounded-none border-black/20"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Confirm Password</label>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="rounded-none border-black/20"
            />
          </div>
        </div>

        <Button className="w-full bg-black text-white hover:bg-black/90 h-12 rounded-none mb-4">
          Create Account
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <button
            onClick={() => setLocation("/login")}
            className="text-accent hover:underline font-semibold"
          >
            Sign in
          </button>
        </p>
      </motion.div>
    </div>
  );
}
