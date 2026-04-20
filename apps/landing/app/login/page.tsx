"use client";

import { useState } from "react";
import { signIn, emailOtp } from "@repo/auth/client";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const { error } = await emailOtp.sendVerificationOtp({
        email: cleanEmail,
        type: "sign-in",
      });
      if (error) {
        toast.error(error.message || "Failed to send OTP");
      } else {
        toast.success("Verification code sent!");
        setOtpSent(true);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length < 6) {
      toast.error("Please enter a 6-digit code");
      return;
    }

    setLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    try {
      const { error } = await signIn.emailOtp({
        email: cleanEmail,
        otp,
        callbackURL: "http://localhost:5174/",
      });
      if (error) {
        toast.error(error.message || "Invalid OTP");
      } else {
        toast.success("Logged in successfully!");
        window.location.href = "http://localhost:5174/?login=success";
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to login");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "http://localhost:5174/?login=success",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/10">
      <Nav />
      <main className="pt-32 pb-20 px-6 max-w-md mx-auto">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
          <h1 className="text-3xl font-bold mb-2 italic uppercase">Login</h1>
          <p className="text-zinc-400 mb-8">Access your priority scheduling dashboard.</p>

          <div className="space-y-4 overflow-hidden">
            <AnimatePresence mode="wait">
              {!otpSent ? (
                <motion.div
                  key="email-step"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 bg-white text-black py-4 rounded-2xl font-bold hover:bg-zinc-200 transition-all active:scale-[0.98]"
                  >
                    Continue with Google
                  </button>

                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase italic font-bold">
                      <span className="bg-[#0e0e0e] px-4 text-zinc-500">Or email</span>
                    </div>
                  </div>

                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-zinc-500 mb-2 ml-1">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 transition-colors"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-zinc-800 text-white py-4 rounded-2xl font-bold hover:bg-zinc-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        "Send Login Link"
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="otp-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-zinc-500 mb-2 ml-1">Verification Code</label>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="000000"
                        maxLength={6}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 transition-colors text-center text-2xl tracking-[0.5em] font-bold"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-white text-black py-4 rounded-2xl font-bold hover:bg-zinc-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Verifying...</span>
                        </>
                      ) : (
                        "Login"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="w-full text-zinc-500 text-sm hover:text-white transition-colors py-2"
                    >
                      Change Email
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
