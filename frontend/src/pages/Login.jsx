import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/login`,
        {
          email,
          password,
        }
      );

      const token = response.data.access_token;

      localStorage.setItem("access_token", token);

      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.detail ||
            "Invalid email or password."
        );
      } else {
        setError(
          "Unable to connect to the server. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070D] text-white flex items-center justify-center relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-[-220px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="absolute bottom-[-250px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Login container */}
      <div className="relative z-10 w-full max-w-[430px] px-6">

        {/* Brand */}
        <div className="flex justify-center mb-10">

          <Link
            to="/"
            className="flex items-center gap-3 group"
          >

            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shadow-lg shadow-blue-500/20">

              <Sparkles size={18} />

            </div>

            <div className="text-left">

              <div className="text-[17px] font-semibold tracking-tight">
                TalentLens
              </div>

              <div className="text-[9px] tracking-[0.18em] text-slate-500 uppercase">
                AI Career Intelligence
              </div>

            </div>

          </Link>

        </div>

        {/* Card */}
        <div className="bg-[#090C13]/95 border border-white/[0.08] rounded-2xl px-8 py-9 shadow-2xl shadow-black/40 backdrop-blur-xl">

          {/* Heading */}
          <div className="mb-8">

            <p className="text-[11px] tracking-[0.18em] text-blue-400 font-medium uppercase mb-3">
              Welcome back
            </p>

            <h1 className="text-[30px] font-semibold tracking-tight">
              Sign in to TalentLens
            </h1>

            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Continue analyzing your career profile
              and discovering your next opportunity.
            </p>

          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 px-4 py-3 rounded-lg border border-red-500/20 bg-red-500/[0.06] text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* Email */}
            <div>

              <label className="block text-xs font-medium text-slate-400 mb-2">
                Email address
              </label>

              <div className="relative">

                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600"
                />

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="w-full h-12 bg-[#0D1119] border border-white/[0.08] rounded-lg pl-10 pr-4 text-sm text-white placeholder:text-slate-700 outline-none transition focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/20"
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <label className="block text-xs font-medium text-slate-400 mb-2">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="w-full h-12 bg-[#0D1119] border border-white/[0.08] rounded-lg pl-10 pr-11 text-sm text-white placeholder:text-slate-700 outline-none transition focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/20"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300 transition"
                >
                  {showPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>

              </div>

            </div>

            {/* Sign in */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 mt-2 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-400 hover:to-violet-400 disabled:opacity-60 text-sm font-semibold transition shadow-lg shadow-blue-500/10"
            >

              {loading
                ? "Signing in..."
                : "Sign in"}

              {!loading && (
                <ArrowRight size={17} />
              )}

            </button>

          </form>

          {/* Signup */}
          <div className="mt-7 text-center">

            <p className="text-sm text-slate-600">

              Don't have an account?{" "}

              <Link
                to="/signup"
                className="text-slate-300 hover:text-white transition font-medium"
              >
                Sign up
              </Link>

            </p>

          </div>

          {/* Security */}
          <div className="mt-7 pt-5 border-t border-white/[0.06] flex items-center justify-center gap-2 text-[11px] text-slate-600">

            <ShieldCheck size={13} />

            Secure authentication

          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-[10px] text-slate-700 mt-6 tracking-wide">
          TALENTLENS AI · CAREER INTELLIGENCE PLATFORM
        </p>

      </div>

    </div>
  );
}

export default Login;