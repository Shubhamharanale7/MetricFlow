import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useLocation } from "wouter";
import { Mail, ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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

        <h1 className="text-4xl font-bold mb-2">Reset Password</h1>
        <p className="text-muted-foreground mb-8">
          {submitted
            ? "Check your email for a password reset link"
            : "Enter your email to receive a password reset link"}
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-none border-black/20"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-black/90 h-12 rounded-none"
            >
              Send Reset Link
            </Button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-accent/10 p-4 rounded">
                <Mail className="text-accent" size={32} />
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              We've sent a password reset link to <strong>{email}</strong>. Check your inbox and follow
              the instructions to reset your password.
            </p>
          </motion.div>
        )}

        <button
          onClick={() => setLocation("/login")}
          className="mt-8 flex items-center gap-2 text-accent hover:underline font-semibold"
        >
          <ArrowLeft size={18} />
          Back to login
        </button>
      </motion.div>
    </div>
  );
}
