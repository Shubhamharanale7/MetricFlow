import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useLocation } from "wouter";
import { getLoginUrl } from "@/const";
import { Mail } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOAuthLogin = () => {
    window.location.href = getLoginUrl();
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

        <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
        <p className="text-muted-foreground mb-8">Sign in to your MetricFlow account</p>

        {/* OAuth Button */}
        <Button
          onClick={handleOAuthLogin}
          className="w-full bg-black text-white hover:bg-black/90 mb-6 h-12 rounded-none flex items-center justify-center gap-2"
        >
          <Mail size={18} />
          Continue with Manus
        </Button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-muted-foreground">Or continue with email</span>
          </div>
        </div>

        {/* Email Form */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-none border-black/20"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-none border-black/20"
            />
          </div>
        </div>

        <Button className="w-full bg-black text-white hover:bg-black/90 h-12 rounded-none mb-4">
          Sign In
        </Button>

        <div className="flex items-center justify-between text-sm">
          <button
            onClick={() => setLocation("/forgot-password")}
            className="text-accent hover:underline font-semibold"
          >
            Forgot password?
          </button>
          <button
            onClick={() => setLocation("/signup")}
            className="text-black hover:underline font-semibold"
          >
            Sign up
          </button>
        </div>
      </motion.div>
    </div>
  );
}
