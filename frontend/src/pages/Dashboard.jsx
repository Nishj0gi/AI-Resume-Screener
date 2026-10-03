import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  LayoutDashboard,
  FileText,
  Target,
  Sparkles,
  Settings,
  LogOut,
  Upload,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  TrendingUp,
  ShieldCheck,
  User,
  ChevronRight,
  BarChart3,
  Activity,
  Zap,
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [animatedResumeScore, setAnimatedResumeScore] = useState(0);
  const [animatedJobMatch, setAnimatedJobMatch] = useState(0);
  const [animatedSkills, setAnimatedSkills] = useState(0);

  const API_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    const loadDashboard = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        navigate("/");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const [dashboardResponse, userResponse] =
          await Promise.all([
            axios.get(`${API_URL}/resume/dashboard`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),

            axios.get(`${API_URL}/me`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);

        setDashboard(dashboardResponse.data);
        setUser(userResponse.data);
      } catch (error) {
        console.error("Dashboard error:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("access_token");
          navigate("/");
          return;
        }

        setError(
          error.response?.data?.detail ||
            "Unable to load your dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [API_URL, navigate]);

  const openResume = () => {
    navigate("/upload-resume");
  };

  const openResults = () => {
    navigate("/results");
  };

  const openInsights = () => {
    navigate("/insights");
  };

  const openSettings = () => {
    navigate("/settings");
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  const resumeScore =
    typeof dashboard?.resume_score === "number"
      ? dashboard.resume_score
      : null;

  const jobMatch =
    typeof dashboard?.latest_job_match === "number"
      ? dashboard.latest_job_match
      : null;

  const detectedSkills =
    typeof dashboard?.detected_skills === "number"
      ? dashboard.detected_skills
      : 0;

  const hasResume = dashboard?.has_resume || false;
  const hasJobMatch = dashboard?.has_job_match || false;

  const resumeProgress =
    resumeScore !== null
      ? Math.min(Math.max(resumeScore, 0), 100)
      : 0;

  const jobMatchProgress =
    jobMatch !== null
      ? Math.min(Math.max(jobMatch, 0), 100)
      : 0;

  useEffect(() => {
    if (resumeScore === null) {
      setAnimatedResumeScore(0);
      return;
    }

    const duration = 900;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress =
        1 - Math.pow(1 - progress, 3);

      setAnimatedResumeScore(
        resumeScore * easedProgress
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [resumeScore]);

  useEffect(() => {
    if (jobMatch === null) {
      setAnimatedJobMatch(0);
      return;
    }

    const duration = 900;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress =
        1 - Math.pow(1 - progress, 3);

      setAnimatedJobMatch(
        jobMatch * easedProgress
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [jobMatch]);

  useEffect(() => {
    const duration = 800;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress =
        1 - Math.pow(1 - progress, 3);

      setAnimatedSkills(
        detectedSkills * easedProgress
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [detectedSkills]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05070D] text-white flex items-center justify-center relative overflow-hidden">

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative flex flex-col items-center gap-5">

          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">

            <Sparkles className="w-6 h-6 text-blue-400 animate-pulse" />

          </div>

          <div className="text-center">

            <p className="text-sm font-medium text-slate-300">
              Preparing your workspace
            </p>

            <p className="text-xs text-slate-600 mt-2">
              Loading your career intelligence...
            </p>

          </div>

          <div className="flex items-center gap-1.5">

            <span className="talentlens-processing-dot" />
            <span className="talentlens-processing-dot" />
            <span className="talentlens-processing-dot" />

          </div>

        </div>

      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#05070D] text-white flex items-center justify-center px-6">

        <div className="max-w-md w-full talentlens-card rounded-2xl p-8 text-center talentlens-page-enter">

          <div className="w-12 h-12 mx-auto rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">

            <ShieldCheck className="w-6 h-6 text-red-400" />

          </div>

          <h2 className="text-xl font-semibold mt-5">
            Dashboard unavailable
          </h2>

          <p className="text-sm text-slate-500 mt-3 leading-6">
            {error}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-500 transition font-semibold talentlens-interactive"
          >
            Try again
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070D] text-white flex talentlens-page-enter">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="hidden lg:flex w-64 shrink-0 min-h-screen bg-[#080f20]/95 backdrop-blur-xl border-r border-slate-800/80 flex-col">

        {/* BRAND */}

        <div className="px-6 py-6 border-b border-slate-800/80">

          <div className="flex items-center gap-3">

            <div className="relative w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center talentlens-glow">

              <Sparkles className="w-5 h-5 text-blue-400" />

            </div>

            <div>

              <h1 className="font-semibold text-white tracking-tight">
                TalentLens
              </h1>

              <p className="text-xs text-slate-500">
                Career Intelligence
              </p>

            </div>

          </div>

        </div>

        {/* NAVIGATION */}

        <div className="flex-1 px-4 py-6">

          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-600 px-3 mb-3">
            Workspace
          </p>

          {/* OVERVIEW */}

          <button
            type="button"
            className="relative w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-500/[0.08] border border-blue-500/20 text-blue-400 transition mb-2 talentlens-interactive"
          >

            <span className="talentlens-active-indicator" />

            <LayoutDashboard className="w-4 h-4" />

            <span className="font-medium">
              Overview
            </span>

          </button>

          {/* RESUME */}

          <button
            type="button"
            onClick={openResume}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/70 transition mb-2 talentlens-interactive"
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
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/70 transition mb-2 talentlens-interactive"
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
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/70 transition mb-2 talentlens-interactive"
          >

            <Sparkles className="w-4 h-4" />

            <span>
              Insights
            </span>

          </button>

          {/* SETTINGS */}

          <button
            type="button"
            onClick={openSettings}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/70 transition talentlens-interactive"
          >

            <Settings className="w-4 h-4" />

            <span>
              Settings
            </span>

          </button>

        </div>

        {/* ACCOUNT */}

        <div className="p-4 border-t border-slate-800/80">

          <div className="flex items-center gap-3 px-3 py-3 mb-2">

            <div className="w-9 h-9 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">

              <User className="w-4 h-4 text-blue-400" />

            </div>

            <div className="min-w-0">

              <p className="text-sm font-medium truncate">
                {user?.full_name || "User"}
              </p>

              <p className="text-[11px] text-slate-600 truncate">
                {user?.email || ""}
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition talentlens-interactive"
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

        <header className="px-6 lg:px-8 py-6 border-b border-slate-800/80">

          <div className="max-w-7xl mx-auto">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

              <div className="talentlens-fade-up">

                <div className="flex items-center gap-2">

                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 talentlens-pulse" />

                  <p className="text-xs uppercase tracking-[0.18em] text-blue-400">
                    TalentLens workspace
                  </p>

                </div>

                <h2 className="text-3xl lg:text-4xl font-bold mt-2 tracking-tight">

                  Welcome back
                  {user?.full_name ? "," : ""}{" "}

                  <span className="text-blue-400">
                    {user?.full_name?.split(" ")[0] || "there"}
                  </span>

                </h2>

                <p className="text-sm text-slate-500 mt-2">
                  Your resume intelligence workspace is ready.
                </p>

              </div>

              <button
                type="button"
                onClick={openResume}
                className="self-start flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition font-semibold shadow-lg shadow-blue-600/10 talentlens-interactive"
              >

                <Upload className="w-4 h-4" />

                Analyze Resume

                <ArrowUpRight className="w-4 h-4" />

              </button>

            </div>

          </div>

        </header>

        {/* CONTENT */}

        <div className="p-6 lg:p-8 max-w-7xl mx-auto">

          {/* =================================================
              HERO
          ================================================= */}

          <section className="relative overflow-hidden rounded-2xl border border-slate-800/90 bg-gradient-to-br from-[#101b32] via-[#101827] to-[#0b101d] p-6 lg:p-8 mb-7 talentlens-card talentlens-fade-up">

            <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-violet-500/5 blur-3xl" />

            <div className="absolute right-16 bottom-0 w-32 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-7">

              <div className="flex items-start gap-5">

                <div className="relative w-14 h-14 shrink-0 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center talentlens-glow">

                  <Sparkles className="w-7 h-7 text-blue-400" />

                </div>

                <div>

                  <p className="text-sm uppercase tracking-wider text-blue-400">
                    Career intelligence
                  </p>

                  <h3 className="text-2xl lg:text-3xl font-bold mt-2 tracking-tight">
                    Turn your resume into insight.
                  </h3>

                  <p className="text-slate-400 mt-3 max-w-2xl leading-7">
                    Upload your resume, compare it with real job
                    descriptions and understand where your profile
                    aligns.
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={openInsights}
                className="shrink-0 flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-blue-500/20 bg-blue-500/5 text-blue-400 hover:bg-blue-500/10 transition talentlens-interactive"
              >

                View insights

                <ArrowUpRight className="w-4 h-4" />

              </button>

            </div>

          </section>

          {/* =================================================
              METRICS
          ================================================= */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">

            <MetricCard
              icon={<FileText className="w-5 h-5 text-blue-400" />}
              label="Resume score"
              value={
                resumeScore !== null
                  ? animatedResumeScore.toFixed(2)
                  : "—"
              }
              description="Overall resume quality"
              accent="blue"
              delay="talentlens-delay-1"
            />

            <MetricCard
              icon={<Target className="w-5 h-5 text-cyan-400" />}
              label="Latest job match"
              value={
                jobMatch !== null
                  ? `${animatedJobMatch.toFixed(2)}%`
                  : "—"
              }
              description="Latest compatibility analysis"
              accent="cyan"
              delay="talentlens-delay-2"
            />

            <MetricCard
              icon={<Sparkles className="w-5 h-5 text-violet-400" />}
              label="Skills detected"
              value={Math.round(animatedSkills)}
              description="Skills identified in your resume"
              accent="violet"
              delay="talentlens-delay-3"
            />

          </div>

          {/* =================================================
              WORKSPACE
          ================================================= */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-7">

            <ActionCard
              icon={<FileText className="w-5 h-5 text-blue-400" />}
              iconBackground="bg-blue-500/10"
              title="Resume analysis"
              description={
                hasResume
                  ? "Your resume has been processed and is ready for further analysis."
                  : "Upload your resume to extract skills and start your analysis."
              }
              buttonText={
                hasResume
                  ? "Analyze another resume"
                  : "Upload resume"
              }
              onClick={openResume}
            />

            <ActionCard
              icon={<Target className="w-5 h-5 text-cyan-400" />}
              iconBackground="bg-cyan-500/10"
              title="Job matching"
              description={
                hasJobMatch
                  ? "Your latest job compatibility analysis is available."
                  : "Compare your resume against a job description."
              }
              buttonText={
                hasJobMatch
                  ? "Run another match"
                  : "Match a job"
              }
              onClick={openResults}
            />

            <ActionCard
              icon={<BarChart3 className="w-5 h-5 text-violet-400" />}
              iconBackground="bg-violet-500/10"
              title="Career insights"
              description="Review your profile signals, scores and areas worth improving."
              buttonText="Open insights"
              onClick={openInsights}
            />

          </div>

          {/* =================================================
              ANALYSIS PROGRESS
          ================================================= */}

          <section className="bg-[#101827] border border-slate-800/90 rounded-2xl p-6 lg:p-7 mb-7 talentlens-card talentlens-fade-up">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

              <div>

                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/10 flex items-center justify-center">

                    <Activity className="w-4 h-4 text-emerald-400" />

                  </div>

                  <div>

                    <h3 className="text-xl font-semibold">
                      Analysis overview
                    </h3>

                    <p className="text-xs text-slate-600 mt-0.5">
                      Live profile signals
                    </p>

                  </div>

                </div>

              </div>

              <button
                type="button"
                onClick={openInsights}
                className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition talentlens-interactive"
              >

                Detailed insights

                <ChevronRight className="w-4 h-4" />

              </button>

            </div>

            <ProgressRow
              label="Resume quality"
              value={
                resumeScore !== null
                  ? `${resumeScore.toFixed(2)}/100`
                  : "Not analyzed"
              }
              progress={resumeProgress}
              color="bg-blue-500"
              icon={<FileText className="w-4 h-4 text-blue-400" />}
            />

            <ProgressRow
              label="Job compatibility"
              value={
                jobMatch !== null
                  ? `${jobMatch.toFixed(2)}%`
                  : "Not analyzed"
              }
              progress={jobMatchProgress}
              color="bg-cyan-400"
              icon={<Target className="w-4 h-4 text-cyan-400" />}
            />

          </section>

          {/* =================================================
              STATUS
          ================================================= */}

          <section className="rounded-2xl border border-slate-800/90 bg-[#0c1425] p-6 talentlens-fade-up">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

              <div className="flex items-start gap-4">

                <div
                  className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center ${
                    hasResume
                      ? "bg-emerald-500/10 border border-emerald-500/10"
                      : "bg-amber-500/10 border border-amber-500/10"
                  }`}
                >

                  {hasResume ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Clock3 className="w-5 h-5 text-amber-400" />
                  )}

                </div>

                <div>

                  <div className="flex items-center gap-2">

                    <h3 className="font-semibold">
                      Workspace status
                    </h3>

                    <span
                      className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full ${
                        hasResume
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {hasResume ? "Ready" : "Setup"}
                    </span>

                  </div>

                  <p className="text-sm text-slate-500 mt-1">

                    {hasResume
                      ? hasJobMatch
                        ? "Your resume and latest job analysis are available."
                        : "Your resume is ready. Run a job match to unlock role-specific analysis."
                      : "Upload a resume to begin your TalentLens analysis."}

                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={
                  !hasResume
                    ? openResume
                    : !hasJobMatch
                    ? openResults
                    : openInsights
                }
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition font-medium talentlens-interactive"
              >

                {!hasResume
                  ? "Upload resume"
                  : !hasJobMatch
                  ? "Analyze a job"
                  : "View insights"}

                <ArrowUpRight className="w-4 h-4" />

              </button>

            </div>

          </section>

          {/* FOOTER */}

          <footer className="text-center text-xs text-slate-600 py-7">
            TalentLens AI · Career Intelligence Platform
          </footer>

        </div>

      </main>

    </div>
  );
}

/* =========================================================
   METRIC CARD
========================================================= */

function MetricCard({
  icon,
  label,
  value,
  description,
  accent,
  delay,
}) {
  const accentStyles = {
    blue: {
      border: "hover:border-blue-500/20",
      glow: "bg-blue-500/5",
      icon: "bg-blue-500/10",
    },

    cyan: {
      border: "hover:border-cyan-500/20",
      glow: "bg-cyan-500/5",
      icon: "bg-cyan-500/10",
    },

    violet: {
      border: "hover:border-violet-500/20",
      glow: "bg-violet-500/5",
      icon: "bg-violet-500/10",
    },
  };

  const styles =
    accentStyles[accent] || accentStyles.blue;

  return (
    <div
      className={`relative overflow-hidden group bg-[#101827] border border-slate-800/90 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${styles.border} ${delay} talentlens-fade-up`}
    >

      <div
        className={`absolute -right-10 -top-10 w-28 h-28 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${styles.glow}`}
      />

      <div className="relative flex items-center justify-between">

        <span className="text-sm text-slate-400">
          {label}
        </span>

        <div
          className={`w-9 h-9 rounded-lg ${styles.icon} border border-white/[0.04] flex items-center justify-center`}
        >
          {icon}
        </div>

      </div>

      <h3 className="relative text-3xl font-bold mt-5 tracking-tight">
        {value}
      </h3>

      <p className="relative text-sm text-slate-500 mt-2">
        {description}
      </p>

    </div>
  );
}

/* =========================================================
   ACTION CARD
========================================================= */

function ActionCard({
  icon,
  iconBackground,
  title,
  description,
  buttonText,
  onClick,
}) {
  return (
    <div className="group relative overflow-hidden bg-[#101827] border border-slate-800/90 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/20 talentlens-fade-up">

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/0 to-transparent group-hover:via-blue-500/30 transition-all duration-500" />

      <div
        className={`w-11 h-11 rounded-xl ${iconBackground} flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}
      >
        {icon}
      </div>

      <h3 className="text-lg font-semibold mt-5">
        {title}
      </h3>

      <p className="text-sm text-slate-400 mt-3 leading-6 min-h-[72px]">
        {description}
      </p>

      <button
        type="button"
        onClick={onClick}
        className="flex items-center gap-2 mt-5 text-sm text-blue-400 hover:text-blue-300 transition talentlens-interactive"
      >

        {buttonText}

        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />

      </button>

    </div>
  );
}

/* =========================================================
   PROGRESS ROW
========================================================= */

function ProgressRow({
  label,
  value,
  progress,
  color,
  icon,
}) {
  return (
    <div className="mt-7">

      <div className="flex items-center justify-between mb-3">

        <div className="flex items-center gap-2">

          {icon}

          <span className="text-sm text-slate-400">
            {label}
          </span>

        </div>

        <span className="text-sm text-slate-300 font-medium">
          {value}
        </span>

      </div>

      <div className="h-2 bg-slate-800/80 rounded-full overflow-hidden">

        <div
          className={`h-full ${color} rounded-full talentlens-progress`}
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

    </div>
  );
}

export default Dashboard;