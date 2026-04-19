import { useState } from "react";
import { signIn, emailOtp } from "@repo/auth/client";

export default function LoginView() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    try {
      const { error } = await emailOtp.sendVerificationOtp({
        email: cleanEmail,
        type: "sign-in",
      });
      if (error) {
        alert(error.message || "Failed to send OTP");
      } else {
        setOtpSent(true);
        alert("OTP sent to your email!");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    try {
      const { error } = await signIn.emailOtp({
        email: cleanEmail,
        otp,
        callbackURL: "http://localhost:5174/",
      });
      if (error) {
        alert(error.message || "Invalid OTP");
      } else {
        window.location.href = "http://localhost:5174/";
      }
    } catch (err) {
      console.error(err);
      alert("Failed to login");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "http://localhost:5174/",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
        <h1 className="text-3xl font-bold mb-2 italic uppercase">Login</h1>
        <p className="text-zinc-400 mb-8">Access your priority scheduling dashboard.</p>

        <div className="space-y-4">
          {!otpSent ? (
            <>
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-white text-black py-4 rounded-2xl font-bold hover:bg-zinc-200 transition-colors"
              >
                Continue with Google
              </button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase italic font-bold">
                  <span className="bg-[#0a0a0a] px-4 text-zinc-500">Or email</span>
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
                  className="w-full bg-zinc-800 text-white py-4 rounded-2xl font-bold hover:bg-zinc-700 transition-colors disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Code"}
                </button>
              </form>
            </>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-500 mb-2 ml-1">Verification Code</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 transition-colors text-center text-2xl tracking-[0.5em] font-bold"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black py-4 rounded-2xl font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Login"}
              </button>
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="w-full text-zinc-500 text-sm hover:text-white transition-colors"
              >
                Change Email
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
