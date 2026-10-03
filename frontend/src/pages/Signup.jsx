import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!fullName || !email || !password) {
      setError("Please fill in all the fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${API_URL}/signup`,
        {
          full_name: fullName,
          email,
          password,
        }
      );

      setSuccess(
        "Account created successfully. Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/");
      }, 1200);

    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.detail ||
            "Unable to create your account."
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
      <div className="absolute top-[-220px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-600/[0.07] blur-[150px] rounded-full pointer-events-none" />

      <div className="absolute bottom-[-250px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/[0.07] blur-[150px] rounded-full pointer-events-none" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main */}
      <div className="relative z-10 w-full max-w-[430px] px-6 py-10">

        {/* Brand */}
        <div className="flex justify-center mb-9">

          <Link
            to="/"
            className="flex items-center gap-3"
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
          <div className="mb-7">

            <p className="text-[11px] tracking-[0.18em] text-violet-400 font-medium uppercase mb-3">
              Get started
            </p>

            <h1 className="text-[30px] font-semibold tracking-tight">
              Create your account
            </h1>

            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Build your career profile and understand
              where your resume fits.
            </p>

          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 flex items-start gap-3 px-4 py-3 rounded-lg border border-red-500/20 bg-red-500/[0.05] text-red-400 text-sm">

              <AlertCircle
                size={17}
                className="mt-0.5 shrink-0"
              />

              <span>{error}</span>

            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-5 flex items-start gap-3 px-4 py-3 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.05] text-emerald-400 text-sm">

              <CheckCircle2
                size={17}
                className="mt-0.5 shrink-0"
              />

              <span>{success}</span>

            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSignup}
            className="space-y-5"
          >

            {/* Full name */}
            <div>

              <label className="block text-xs font-medium text-slate-400 mb-2">
                Full name
              </label>

              <div className="relative">

                <User
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600"
                />

                <input
                  type="text"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(e.target.value)
                  }
                  className="w-full h-12 bg-[#0D1119] border border-white/[0.08] rounded-lg pl-10 pr-4 text-sm text-white placeholder:text-slate-700 outline-none transition focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/20"
                />

              </div>

            </div>

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
                  placeholder="Create a password"
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

              <p className="text-[10px] text-slate-700 mt-2">
                Use at least 8 characters.
              </p>

            </div>

            {/* Create account */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 mt-2 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-400 hover:to-violet-400 disabled:opacity-60 text-sm font-semibold transition shadow-lg shadow-blue-500/10"
            >

              {loading
                ? "Creating account..."
                : "Create account"}

              {!loading && (
                <ArrowRight size={17} />
              )}

            </button>

          </form>

          {/* Login */}
          <div className="mt-7 text-center">

            <p className="text-sm text-slate-600">

              Already have an account?{" "}

              <Link
                to="/"
                className="text-slate-300 hover:text-white transition font-medium"
              >
                Sign in
              </Link>

            </p>

          </div>

          {/* Security */}
          <div className="mt-7 pt-5 border-t border-white/[0.06] flex items-center justify-center gap-2 text-[11px] text-slate-600">

            <ShieldCheck size={13} />

            Your account is securely protected

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

export default Signup;