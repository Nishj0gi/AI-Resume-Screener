import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  LayoutDashboard,
  FileText,
  Target,
  Sparkles,
  Settings as SettingsIcon,
  LogOut,
  User,
  Mail,
  ShieldCheck,
  Server,
  CheckCircle2,
  ArrowRight,
  LockKeyhole,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

function Settings() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const [errorMessage, setErrorMessage] = useState("");

  const API_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    let mounted = true;

    const loadSettings = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        navigate("/", { replace: true });
        return;
      }

      try {
        const response = await axios.get(
          `${API_URL}/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },

            // Prevent infinite loading
            timeout: 7000,
          }
        );

        if (!mounted) return;

        setUser(response.data);
        setBackendStatus("Connected");
        setErrorMessage("");
      } catch (error) {
        console.error("Settings error:", error);

        if (!mounted) return;

        if (error.response?.status === 401) {
          localStorage.removeItem("access_token");

          navigate("/", {
            replace: true,
          });

          return;
        }

        if (error.code === "ECONNABORTED") {
          setBackendStatus("Timeout");
          setErrorMessage(
            "The backend took too long to respond."
          );
        } else if (!error.response) {
          setBackendStatus("Unavailable");
          setErrorMessage(
            "Unable to connect to the TalentLens backend."
          );
        } else {
          setBackendStatus("Unavailable");
          setErrorMessage(
            "Unable to load account information."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadSettings();

    return () => {
      mounted = false;
    };
  }, [API_URL, navigate]);


  /* ================================
     NAVIGATION
  ================================= */

  const openDashboard = () => {
    navigate("/dashboard");
  };

  const openResume = () => {
    navigate("/upload-resume");
  };

  const openResults = () => {
    navigate("/results");
  };

  const openInsights = () => {
    navigate("/insights");
  };


  /* ================================
     LOGOUT
  ================================= */

  const logout = () => {
    localStorage.removeItem("access_token");

    // Force navigation to the public login route.
    window.location.replace("/");
  };


  /* ================================
     LOADING
  ================================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05070D] text-white flex items-center justify-center">

        <div className="flex flex-col items-center gap-4">

          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">

            <RefreshCw
              className="w-5 h-5 text-blue-400 animate-spin"
            />

          </div>

          <div className="text-center">

            <p className="text-white font-medium">
              Loading settings
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Connecting to TalentLens
            </p>

          </div>

        </div>

      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[#05070D] text-white flex">


      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="hidden lg:flex w-64 shrink-0 min-h-screen bg-[#080F20] border-r border-slate-800 flex-col">


        {/* BRAND */}

        <div className="px-6 py-6 border-b border-slate-800">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">

              <Sparkles className="w-5 h-5 text-blue-400" />

            </div>

            <div>

              <h1 className="font-semibold text-white">
                TalentLens
              </h1>

              <p className="text-xs text-slate-500">
                Career Intelligence
              </p>

            </div>

          </div>

        </div>


        {/* NAVIGATION */}

        <nav className="flex-1 px-4 py-6">

          <p className="text-[10px] uppercase tracking-widest text-slate-600 px-3 mb-3">
            Workspace
          </p>


          {/* DASHBOARD */}

          <button
            type="button"
            onClick={openDashboard}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition mb-2"
          >

            <LayoutDashboard className="w-4 h-4" />

            <span>
              Overview
            </span>

          </button>


          {/* RESUME */}

          <button
            type="button"
            onClick={openResume}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition mb-2"
          >

            <FileText className="w-4 h-4" />

            <span>
              Resume
            </span>

          </button>


          {/* JOB MATCHING */}

          <button
            type="button"
            onClick={openResults}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition mb-2"
          >

            <Target className="w-4 h-4" />

            <span>
              Job Matching
            </span>

          </button>


          {/* INSIGHTS */}

          <button
            type="button"
            onClick={openInsights}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition mb-2"
          >

            <Sparkles className="w-4 h-4" />

            <span>
              Insights
            </span>

          </button>


          {/* SETTINGS */}

          <button
            type="button"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 transition"
          >

            <SettingsIcon className="w-4 h-4" />

            <span>
              Settings
            </span>

          </button>

        </nav>


        {/* USER / LOGOUT */}

        <div className="p-4 border-t border-slate-800">

          <div className="flex items-center gap-3 px-3 py-3 mb-2">

            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center font-bold text-sm text-white">

              {user?.full_name
                ? user.full_name.charAt(0).toUpperCase()
                : "U"}

            </div>

            <div className="min-w-0">

              <p className="text-sm font-medium truncate text-white">
                {user?.full_name || "Candidate"}
              </p>

              <p className="text-xs text-slate-500 truncate">
                Candidate
              </p>

            </div>

          </div>


          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition"
          >

            <LogOut className="w-4 h-4" />

            <span>
              Logout
            </span>

          </button>

        </div>

      </aside>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="flex-1 min-w-0 overflow-y-auto">


        {/* HEADER */}

        <header className="border-b border-slate-800 bg-[#05070D]/90 backdrop-blur">

          <div className="px-6 lg:px-10 py-7">

            <p className="text-xs uppercase tracking-[0.2em] text-blue-400">
              Application Settings
            </p>

            <h2 className="text-3xl lg:text-4xl font-bold mt-2">
              Settings
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              Manage your TalentLens account and application status.
            </p>

          </div>

        </header>


        <div className="p-6 lg:p-10 max-w-6xl mx-auto">


          {/* ERROR */}

          {errorMessage && (

            <div className="mb-6 rounded-2xl border border-amber-500/20 bg-amber-500/[0.05] p-5">

              <div className="flex items-start gap-3">

                <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />

                <div>

                  <p className="font-medium text-amber-300">
                    Connection notice
                  </p>

                  <p className="text-sm text-slate-400 mt-1">
                    {errorMessage}
                  </p>

                </div>

              </div>

            </div>

          )}


          {/* =================================================
              PROFILE
          ================================================= */}

          <section className="bg-[#101827] border border-slate-800 rounded-3xl p-6 lg:p-8 mb-6">

            <div className="flex items-center gap-4 mb-7">

              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">

                <User className="w-6 h-6 text-blue-400" />

              </div>

              <div>

                <h3 className="text-xl font-semibold">
                  Profile information
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Your registered TalentLens account details.
                </p>

              </div>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


              {/* NAME */}

              <div className="rounded-2xl bg-[#0B1220] border border-white/[0.06] p-5">

                <div className="flex items-center gap-3">

                  <User className="w-4 h-4 text-slate-500" />

                  <span className="text-xs uppercase tracking-wider text-slate-500">
                    Full name
                  </span>

                </div>

                <p className="text-base font-medium mt-3">
                  {user?.full_name || "Not available"}
                </p>

              </div>


              {/* EMAIL */}

              <div className="rounded-2xl bg-[#0B1220] border border-white/[0.06] p-5">

                <div className="flex items-center gap-3">

                  <Mail className="w-4 h-4 text-slate-500" />

                  <span className="text-xs uppercase tracking-wider text-slate-500">
                    Email address
                  </span>

                </div>

                <p className="text-base font-medium mt-3 break-all">
                  {user?.email || "Not available"}
                </p>

              </div>


              {/* ACCOUNT ID */}

              <div className="rounded-2xl bg-[#0B1220] border border-white/[0.06] p-5">

                <div className="flex items-center gap-3">

                  <ShieldCheck className="w-4 h-4 text-emerald-400" />

                  <span className="text-xs uppercase tracking-wider text-slate-500">
                    Account ID
                  </span>

                </div>

                <p className="text-base font-medium mt-3">
                  #{user?.id ?? "—"}
                </p>

              </div>


              {/* AUTH */}

              <div className="rounded-2xl bg-[#0B1220] border border-white/[0.06] p-5">

                <div className="flex items-center gap-3">

                  <LockKeyhole className="w-4 h-4 text-blue-400" />

                  <span className="text-xs uppercase tracking-wider text-slate-500">
                    Authentication
                  </span>

                </div>

                <p className="text-emerald-400 text-sm font-medium mt-3">
                  Authenticated
                </p>

              </div>

            </div>

          </section>


          {/* =================================================
              SECURITY
          ================================================= */}

          <section className="bg-[#101827] border border-slate-800 rounded-3xl p-6 lg:p-8 mb-6">

            <div className="flex items-center gap-4 mb-6">

              <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">

                <LockKeyhole className="w-6 h-6 text-violet-400" />

              </div>

              <div>

                <h3 className="text-xl font-semibold">
                  Security
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Current authentication status.
                </p>

              </div>

            </div>


            <div className="rounded-2xl border border-white/[0.06] bg-[#0B1220] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

              <div>

                <p className="font-medium">
                  Password authentication
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  Your account is protected using authenticated login.
                </p>

              </div>

              <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">

                <CheckCircle2 className="w-4 h-4" />

                Active

              </div>

            </div>

          </section>


          {/* =================================================
              SYSTEM STATUS
          ================================================= */}

          <section className="bg-[#101827] border border-slate-800 rounded-3xl p-6 lg:p-8 mb-6">

            <div className="flex items-center gap-4 mb-6">

              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">

                <Server className="w-6 h-6 text-cyan-400" />

              </div>

              <div>

                <h3 className="text-xl font-semibold">
                  System status
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Current connection with the TalentLens backend.
                </p>

              </div>

            </div>


            <div className="rounded-2xl border border-white/[0.06] bg-[#0B1220] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

              <div>

                <p className="font-medium">
                  Backend API
                </p>

                <p className="text-sm text-slate-500 mt-1 break-all">
                  {API_URL}
                </p>

              </div>


              <div
                className={`flex items-center gap-2 text-sm font-medium ${
                  backendStatus === "Connected"
                    ? "text-emerald-400"
                    : backendStatus === "Checking..."
                    ? "text-blue-400"
                    : "text-amber-400"
                }`}
              >

                <span className="w-2 h-2 rounded-full bg-current" />

                {backendStatus}

              </div>

            </div>

          </section>


          {/* =================================================
              ACCOUNT
          ================================================= */}

          <section className="rounded-3xl border border-red-500/10 bg-red-500/[0.03] p-6 lg:p-8">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

              <div>

                <p className="text-xs uppercase tracking-[0.2em] text-red-400">
                  Account
                </p>

                <h3 className="text-lg font-semibold mt-2">
                  Sign out of TalentLens
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  End your current authenticated session on this device.
                </p>

              </div>


              <button
                type="button"
                onClick={logout}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/30 transition font-medium"
              >

                <LogOut className="w-4 h-4" />

                Logout

              </button>

            </div>

          </section>


          {/* BACK */}

          <div className="flex justify-center mt-8">

            <button
              type="button"
              onClick={openDashboard}
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-400 transition"
            >

              Back to overview

              <ArrowRight className="w-4 h-4" />

            </button>

          </div>


          <footer className="text-center text-xs text-slate-600 py-6">
            TalentLens AI · Career Intelligence Platform
          </footer>

        </div>

      </main>

    </div>
  );
}

export default Settings;