import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { signIn, emailOtp } from "@repo/auth/client";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Calendar, Clock, CheckCircle2 } from "lucide-react";

export default function LoginView() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
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
        navigate("/");
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
    <div className="min-h-screen bg-black text-white selection:bg-white/10 flex flex-col md:flex-row">
      {/* Left Side: Visuals & Branding */}
      <div className="hidden md:flex md:w-1/2 bg-[#0d0d0d] border-r border-white/5 flex-col justify-between p-16 relative overflow-hidden">
        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-12"
          >
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <Calendar className="text-black w-6 h-6" />
            </div>
            <span className="text-2xl font-black uppercase tracking-tighter">Scheduler</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-bold leading-tight mb-6 italic uppercase tracking-tighter"
          >
            System <br />
            Authentication <br />
            Portal.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 text-lg max-w-sm"
          >
            Access the core scheduling engine. Securely managed and monitored.
          </motion.p>
        </div>

        <div className="relative z-10">
          <div className="grid grid-cols-3 gap-8">
            {[
              { icon: Clock, text: "High Priority" },
              { icon: CheckCircle2, text: "Verified Only" },
              { icon: Calendar, text: "Core Access" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className="flex flex-col gap-3"
              >
                <item.icon className="text-zinc-700 w-5 h-5" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Abstract Background Visual */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-[0.03]">
          <div className="grid grid-cols-8 gap-4 w-[150%] rotate-12">
            {[...Array(64)].map((_, i) => (
              <div key={i} className="aspect-square border border-white rounded-2xl" />
            ))}
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-20 relative bg-black">
        <div className="md:hidden absolute top-8 left-8">
          <span className="text-xl font-black uppercase tracking-tighter">Scheduler</span>
        </div>

        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold italic uppercase tracking-tighter">Portal Login</h1>
            <p className="text-zinc-500 text-sm">Enter your credentials to manage the platform.</p>
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {!otpSent ? (
                <motion.div
                  key="email-step"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 bg-white text-black py-4 rounded-2xl font-bold hover:bg-zinc-200 transition-all active:scale-[0.98] shadow-2xl shadow-white/5"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                  </button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/5"></div>
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase italic font-black">
                      <span className="bg-black px-4 text-zinc-700 tracking-[0.2em]">Platform Auth</span>
                    </div>
                  </div>

                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black uppercase text-zinc-600 tracking-widest ml-1">Work Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-zinc-700 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.98] border border-white/5"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        "Send Otp"
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
                  className="space-y-6"
                >
                  <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <div className="space-y-4 text-center">
                      <label className="block text-[10px] font-black uppercase text-zinc-600 tracking-[0.3em]">Identity Verification</label>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="******"
                        maxLength={6}
                        className="w-full bg-transparent border-b-2 border-white/10 py-4 text-white placeholder:text-zinc-800 focus:outline-none focus:border-white transition-all text-center text-5xl tracking-[0.3em] font-black"
                        required
                      />
                      <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest">
                        Check your inbox for the code
                      </p>
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
                        "Verify & Continue"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="w-full text-zinc-600 text-[10px] uppercase font-black tracking-widest hover:text-white transition-colors"
                    >
                      Incorrect Email?
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="absolute bottom-8 text-[10px] text-zinc-700 font-bold uppercase tracking-[0.2em]">
          &copy; 2026 Scheduler Industrial Inc.
        </div>
      </div>
    </div>
  );
}
