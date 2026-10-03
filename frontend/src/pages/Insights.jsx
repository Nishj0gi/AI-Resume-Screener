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
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Lightbulb,
  AlertCircle,
  ShieldCheck,
  BarChart3,
  Compass,
  Activity,
  Zap,
  CircleCheck,
  TriangleAlert,
} from "lucide-react";

function Insights() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [animatedResumeScore, setAnimatedResumeScore] = useState(0);
  const [animatedJobMatch, setAnimatedJobMatch] = useState(0);
  const [animatedSkills, setAnimatedSkills] = useState(0);

  const API_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        navigate("/");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${API_URL}/resume/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDashboard(response.data);
      } catch (error) {
        console.error("Insights error:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("access_token");
          navigate("/");
          return;
        }

        setError(
          error.response?.data?.detail ||
            "Unable to load your insights."
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [API_URL, navigate]);

  /* =========================================================
     NAVIGATION
  ========================================================= */

  const openDashboard = () => {
    navigate("/dashboard");
  };

  const openResume = () => {
    navigate("/upload-resume");
  };

  const openResults = () => {
    navigate("/results");
  };

  const openSettings = () => {
    navigate("/settings");
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  /* =========================================================
     DATA
  ========================================================= */

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

  const resumePercentage =
    resumeScore !== null
      ? Math.min(Math.max(resumeScore, 0), 100)
      : 0;

  const jobMatchPercentage =
    jobMatch !== null
      ? Math.min(Math.max(jobMatch, 0), 100)
      : 0;

  /* =========================================================
     ANIMATED METRICS
  ========================================================= */

  useEffect(() => {
    if (resumeScore === null) {
      setAnimatedResumeScore(0);
      return;
    }

    const duration = 1000;
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

    const duration = 1000;
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
    const duration = 850;
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

  /* =========================================================
     STATUS HELPERS
  ========================================================= */

  const getResumeStatus = () => {
    if (resumeScore === null) {
      return {
        label: "Not analyzed",
        description:
          "Upload and analyze your resume to generate a score.",
        tone: "text-slate-400",
        background: "bg-slate-500/10",
        border: "border-slate-500/10",
        icon: Activity,
      };
    }

    if (resumeScore >= 80) {
      return {
        label: "Strong profile coverage",
        description:
          "Your current resume contains substantial profile information.",
        tone: "text-emerald-400",
        background: "bg-emerald-500/10",
        border: "border-emerald-500/10",
        icon: CircleCheck,
      };
    }

    if (resumeScore >= 60) {
      return {
        label: "Room for improvement",
        description:
          "Your resume has useful content but can be strengthened further.",
        tone: "text-amber-400",
        background: "bg-amber-500/10",
        border: "border-amber-500/10",
        icon: TriangleAlert,
      };
    }

    return {
      label: "Needs improvement",
      description:
        "Consider strengthening your resume structure and role relevance.",
      tone: "text-red-400",
      background: "bg-red-500/10",
      border: "border-red-500/10",
      icon: TriangleAlert,
    };
  };

  const getJobMatchStatus = () => {
    if (jobMatch === null) {
      return {
        label: "No match yet",
        description:
          "Run a job analysis to understand your compatibility.",
        tone: "text-slate-400",
        background: "bg-slate-500/10",
        border: "border-slate-500/10",
        icon: Activity,
      };
    }

    if (jobMatch >= 80) {
      return {
        label: "High skill alignment",
        description:
          "Your resume contains many of the skills detected in this role.",
        tone: "text-emerald-400",
        background: "bg-emerald-500/10",
        border: "border-emerald-500/10",
        icon: CircleCheck,
      };
    }

    if (jobMatch >= 60) {
      return {
        label: "Moderate alignment",
        description:
          "Some relevant skills are present, with opportunities to improve alignment.",
        tone: "text-amber-400",
        background: "bg-amber-500/10",
        border: "border-amber-500/10",
        icon: TriangleAlert,
      };
    }

    return {
      label: "Low alignment",
      description:
        "Review the role requirements and address relevant skill gaps.",
      tone: "text-red-400",
      background: "bg-red-500/10",
      border: "border-red-500/10",
      icon: TriangleAlert,
    };
  };

  const resumeStatus = getResumeStatus();
  const jobMatchStatus = getJobMatchStatus();

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05070D] text-white flex items-center justify-center relative overflow-hidden">

        <div className="absolute inset-0 pointer-events-none">

          <div className="absolute top-1/4 left-1/3 w-72 h-72 rounded-full bg-blue-500/5 blur-3xl talentlens-float" />

          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-violet-500/5 blur-3xl" />

        </div>

        <div className="relative flex flex-col items-center gap-5 talentlens-page-enter">

          <div className="relative w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center talentlens-glow">

            <div className="absolute inset-0 rounded-2xl border border-blue-400/20 animate-ping opacity-20" />

            <Sparkles className="relative w-6 h-6 text-blue-400 animate-pulse" />

          </div>

          <div className="text-center">

            <p className="text-sm font-medium text-slate-300">
              Building your insights
            </p>

            <p className="text-xs text-slate-600 mt-2">
              Reading your latest career signals...
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

  /* =========================================================
     ERROR
  ========================================================= */

  if (error) {
    return (
      <div className="min-h-screen bg-[#05070D] text-white flex">

        <aside className="hidden lg:flex w-64 shrink-0 min-h-screen bg-[#080f20] border-r border-slate-800 flex-col">

          <div className="px-6 py-6 border-b border-slate-800">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">

                <Sparkles className="w-5 h-5 text-blue-400" />

              </div>

              <div>

                <h1 className="font-semibold">
                  TalentLens
                </h1>

                <p className="text-xs text-slate-500">
                  Career Intelligence
                </p>

              </div>

            </div>

          </div>

        </aside>

        <main className="flex-1 flex items-center justify-center px-6">

          <div className="max-w-md w-full bg-[#090C13] border border-white/[0.08] rounded-2xl p-8 text-center talentlens-page-enter talentlens-card">

            <div className="w-12 h-12 mx-auto rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">

              <AlertCircle className="w-6 h-6 text-red-400" />

            </div>

            <h2 className="text-xl font-semibold mt-5">
              Unable to load insights
            </h2>

            <p className="text-sm text-slate-500 mt-3 leading-relaxed">
              {error}
            </p>

            <div className="flex gap-3 mt-6">

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="flex-1 h-11 rounded-lg bg-blue-500 hover:bg-blue-400 transition text-sm font-semibold talentlens-interactive"
              >
                Try again
              </button>

              <button
                type="button"
                onClick={openDashboard}
                className="flex-1 h-11 rounded-lg border border-white/[0.08] hover:bg-white/[0.03] transition text-sm talentlens-interactive"
              >
                Dashboard
              </button>

            </div>

          </div>

        </main>

      </div>
    );
  }

  /* =========================================================
     MAIN PAGE
  ========================================================= */

  return (
    <div className="min-h-screen bg-[#05070D] text-white flex talentlens-page-enter">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="hidden lg:flex w-64 shrink-0 min-h-screen bg-[#080f20]/95 backdrop-blur-xl border-r border-slate-800/80 flex-col">

        <div className="px-6 py-6 border-b border-slate-800/80">

          <div className="flex items-center gap-3">

            <div className="relative w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center talentlens-glow">

              <div className="absolute inset-0 rounded-xl border border-blue-400/10 animate-pulse" />

              <Sparkles className="relative w-5 h-5 text-blue-400" />

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

        <div className="flex-1 px-4 py-6">

          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-600 px-3 mb-3">
            Workspace
          </p>

          <button
            type="button"
            onClick={openDashboard}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/70 transition mb-2 talentlens-interactive"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview</span>
          </button>

          <button
            type="button"
            onClick={openResume}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/70 transition mb-2 talentlens-interactive"
          >
            <FileText className="w-4 h-4" />
            <span>Resume</span>
          </button>

          <button
            type="button"
            onClick={openResults}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/70 transition mb-2 talentlens-interactive"
          >
            <Target className="w-4 h-4" />
            <span>Job Matching</span>
          </button>

          <button
            type="button"
            className="relative w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-500/[0.08] border border-blue-500/20 text-blue-400 transition mb-2 talentlens-interactive"
          >
            <span className="talentlens-active-indicator" />
            <Sparkles className="w-4 h-4" />
            <span className="font-medium">Insights</span>
          </button>

          <button
            type="button"
            onClick={openSettings}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/70 transition talentlens-interactive"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>

        </div>

        <div className="p-4 border-t border-slate-800/80">

          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition talentlens-interactive"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
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

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

              <div className="talentlens-fade-up">

                <div className="flex items-center gap-2">

                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 talentlens-pulse" />

                  <p className="text-xs uppercase tracking-[0.18em] text-blue-400">
                    AI Career Intelligence
                  </p>

                </div>

                <h2 className="text-3xl lg:text-4xl font-bold mt-2 tracking-tight">
                  Career Insights
                </h2>

                <p className="text-sm text-slate-500 mt-2">
                  Understand what your current resume data tells you.
                </p>

              </div>

              <button
                type="button"
                onClick={openResume}
                className="self-start sm:self-auto flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition font-semibold shadow-lg shadow-blue-600/10 talentlens-interactive"
              >

                <Upload className="w-4 h-4" />

                Analyze Resume

                <ArrowUpRight className="w-4 h-4" />

              </button>

            </div>

          </div>

        </header>

        {/* PAGE CONTENT */}

        <div className="p-6 lg:p-8 max-w-7xl mx-auto">

          {/* HERO */}

          <section className="relative overflow-hidden rounded-2xl border border-slate-800/90 bg-gradient-to-br from-[#101b32] via-[#101827] to-[#0b101d] p-6 lg:p-8 mb-7 talentlens-card talentlens-fade-up">

            <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl talentlens-float" />

            <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-violet-500/5 blur-3xl" />

            <div className="absolute right-12 bottom-5 w-36 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-7">

              <div className="flex items-start gap-5">

                <div className="relative w-14 h-14 shrink-0 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center talentlens-glow">

                  <div className="absolute inset-0 rounded-2xl border border-blue-400/10 animate-pulse" />

                  <Sparkles className="relative w-7 h-7 text-blue-400" />

                </div>

                <div>

                  <div className="flex items-center gap-2">

                    <p className="text-sm uppercase tracking-wider text-blue-400">
                      Personalized analysis
                    </p>

                    <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/10 text-[9px] uppercase tracking-wider text-blue-400">
                      AI
                    </span>

                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold mt-2 tracking-tight">
                    Understand your career fit.
                  </h3>

                  <p className="text-slate-400 mt-4 max-w-3xl leading-7">
                    TalentLens uses your uploaded resume and latest
                    job-match data to highlight profile coverage,
                    skill alignment and areas worth reviewing.
                  </p>

                </div>

              </div>

              <div className="hidden lg:flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.05] talentlens-interactive">

                <Zap className="w-4 h-4 text-blue-400" />

                <div>

                  <p className="text-xs text-slate-400">
                    Intelligence status
                  </p>

                  <p className="text-xs text-emerald-400 mt-0.5">
                    Analysis available
                  </p>

                </div>

              </div>

            </div>

          </section>

          {/* METRICS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">

            <InsightMetric
              icon={<FileText className="w-5 h-5 text-blue-400" />}
              label="Resume score"
              value={
                resumeScore !== null
                  ? animatedResumeScore.toFixed(2)
                  : "—"
              }
              description="Overall resume quality"
              status={resumeStatus.label}
              statusTone={resumeStatus.tone}
              accent="blue"
              delay="talentlens-delay-1"
            />

            <InsightMetric
              icon={<Target className="w-5 h-5 text-cyan-400" />}
              label="Latest job match"
              value={
                jobMatch !== null
                  ? `${animatedJobMatch.toFixed(2)}%`
                  : "—"
              }
              description="Latest compatibility analysis"
              status={jobMatchStatus.label}
              statusTone={jobMatchStatus.tone}
              accent="cyan"
              delay="talentlens-delay-2"
            />

            <InsightMetric
              icon={<Sparkles className="w-5 h-5 text-violet-400" />}
              label="Skills detected"
              value={Math.round(animatedSkills)}
              description="Skills identified in your resume"
              status={
                detectedSkills > 0
                  ? "Profile signals detected"
                  : "No skills detected yet"
              }
              statusTone={
                detectedSkills > 0
                  ? "text-violet-400"
                  : "text-slate-500"
              }
              accent="violet"
              delay="talentlens-delay-3"
            />

          </div>

          {/* PROFILE INTERPRETATION */}

          <section className="bg-[#101827] border border-slate-800/90 rounded-2xl p-6 lg:p-7 mb-7 talentlens-card talentlens-fade-up talentlens-delay-1">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/10 flex items-center justify-center">

                  <Compass className="w-5 h-5 text-blue-400" />

                </div>

                <div>

                  <h3 className="text-xl font-semibold">
                    Profile interpretation
                  </h3>

                  <p className="text-xs text-slate-500 mt-1">
                    A quick reading of your current analysis
                  </p>

                </div>

              </div>

              <span className="text-[10px] uppercase tracking-widest text-slate-600">
                Current signals
              </span>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">

              <InterpretationCard
                icon={<BarChart3 className="w-5 h-5 text-blue-400" />}
                title="Resume profile"
                description={resumeStatus.description}
                tone={resumeStatus.tone}
                status={resumeStatus.label}
              />

              <InterpretationCard
                icon={<Target className="w-5 h-5 text-cyan-400" />}
                title="Job alignment"
                description={jobMatchStatus.description}
                tone={jobMatchStatus.tone}
                status={jobMatchStatus.label}
              />

            </div>

          </section>

          {/* PERFORMANCE */}

          <section className="bg-[#101827] border border-slate-800/90 rounded-2xl p-6 lg:p-7 mb-7 talentlens-card talentlens-fade-up talentlens-delay-2">

            <div className="flex items-center justify-between gap-4">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/10 flex items-center justify-center">

                  <TrendingUp className="w-5 h-5 text-emerald-400" />

                </div>

                <div>

                  <h3 className="text-xl font-semibold">
                    Performance overview
                  </h3>

                  <p className="text-xs text-slate-500 mt-1">
                    Current profile metrics
                  </p>

                </div>

              </div>

            </div>

            <p className="text-slate-400 mt-5 leading-6 max-w-3xl">
              These indicators are based on the scores currently
              available from your resume analysis and latest job match.
            </p>

            <PerformanceRow
              label="Resume quality"
              value={
                resumeScore !== null
                  ? `${resumeScore.toFixed(2)}/100`
                  : "Not analyzed"
              }
              progress={resumePercentage}
              color="bg-blue-500"
              icon={<FileText className="w-4 h-4 text-blue-400" />}
            />

            <PerformanceRow
              label="Job compatibility"
              value={
                jobMatch !== null
                  ? `${jobMatch.toFixed(2)}%`
                  : "Not analyzed"
              }
              progress={jobMatchPercentage}
              color="bg-cyan-400"
              icon={<Target className="w-4 h-4 text-cyan-400" />}
            />

          </section>

          {/* ACTIONABLE INSIGHTS */}

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-7">

            <InsightPanel
              icon={
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              }
              iconBackground="bg-emerald-500/10"
              title="Current strengths"
              subtitle="Signals already present in your profile"
              delay="talentlens-delay-1"
            >

              <div className="space-y-4">

                {hasResume ? (
                  <>
                    <InsightItem>
                      Your resume has been successfully processed by
                      TalentLens.
                    </InsightItem>

                    {detectedSkills > 0 && (
                      <InsightItem>
                        TalentLens detected {detectedSkills} skills
                        from your resume.
                      </InsightItem>
                    )}

                    {resumeScore !== null && (
                      <InsightItem>
                        Your resume currently has a measurable
                        quality score of {resumeScore.toFixed(2)}.
                      </InsightItem>
                    )}

                    {jobMatch !== null && (
                      <InsightItem>
                        A job compatibility analysis is available
                        for your latest opportunity.
                      </InsightItem>
                    )}
                  </>
                ) : (
                  <InsightItem>
                    Upload a resume to start identifying your
                    current profile strengths.
                  </InsightItem>
                )}

              </div>

            </InsightPanel>

            <InsightPanel
              icon={
                <Lightbulb className="w-5 h-5 text-amber-400" />
              }
              iconBackground="bg-amber-500/10"
              title="Areas to review"
              subtitle="Practical next steps"
              delay="talentlens-delay-2"
            >

              <div className="space-y-4">

                {!hasResume && (
                  <InsightItem>
                    Upload your latest resume before evaluating
                    career fit.
                  </InsightItem>
                )}

                {hasResume && resumeScore === null && (
                  <InsightItem>
                    Run a job match to generate a role-specific
                    resume score.
                  </InsightItem>
                )}

                {hasJobMatch &&
                  jobMatch !== null &&
                  jobMatch < 80 && (
                    <InsightItem>
                      Review the missing skills shown in the detailed
                      job analysis and prioritize relevant ones.
                    </InsightItem>
                  )}

                {hasResume && (
                  <InsightItem>
                    Keep your resume targeted toward the specific
                    role you are applying for.
                  </InsightItem>
                )}

                {detectedSkills === 0 && hasResume && (
                  <InsightItem>
                    Review the technical skills section of your
                    resume to ensure relevant skills are clearly listed.
                  </InsightItem>
                )}

              </div>

            </InsightPanel>

          </section>

          {/* QUICK ACTIONS */}

          <section className="mb-7 talentlens-fade-up talentlens-delay-3">

            <div className="flex items-center justify-between mb-5">

              <div>

                <p className="text-xs uppercase tracking-widest text-blue-400">
                  Next steps
                </p>

                <h3 className="text-xl font-semibold mt-1">
                  Continue your analysis
                </h3>

              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              <QuickActionCard
                icon={<Target className="w-5 h-5 text-blue-400" />}
                iconBackground="bg-blue-500/10"
                title="Analyze job fit"
                description="Compare your resume with another job description."
                action="Match a job"
                onClick={openResults}
              />

              <QuickActionCard
                icon={<FileText className="w-5 h-5 text-violet-400" />}
                iconBackground="bg-violet-500/10"
                title="Upload new resume"
                description="Analyze a newer version of your resume."
                action="Upload resume"
                onClick={openResume}
              />

              <QuickActionCard
                icon={<BarChart3 className="w-5 h-5 text-cyan-400" />}
                iconBackground="bg-cyan-400/10"
                title="View detailed analysis"
                description="Review your latest compatibility score and skill gaps."
                action="View results"
                onClick={openResults}
              />

            </div>

          </section>

          {/* STATUS */}

          <section className="relative overflow-hidden bg-[#0c1425] border border-slate-800/90 rounded-2xl p-6 mb-7 talentlens-fade-up">

            <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />

            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5">

              <div className="flex items-start gap-3">

                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/10 flex items-center justify-center shrink-0">

                  <ShieldCheck className="w-4 h-4 text-emerald-400" />

                </div>

                <div>

                  <div className="flex items-center gap-2">

                    <h3 className="font-semibold">
                      Analysis status
                    </h3>

                    <span className="text-[9px] uppercase tracking-wider px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 talentlens-pulse">
                      Live
                    </span>

                  </div>

                  <p className="text-sm text-slate-500 mt-1">

                    {hasResume
                      ? hasJobMatch
                        ? "Resume and latest job analysis are available."
                        : "Resume is available. Run a job match to generate role-specific insights."
                      : "Upload a resume to begin your career analysis."}

                  </p>

                </div>

              </div>

              {!hasResume && (
                <button
                  type="button"
                  onClick={openResume}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-500 hover:bg-blue-400 text-sm font-medium transition talentlens-interactive"
                >
                  Upload resume
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {hasResume && !hasJobMatch && (
                <button
                  type="button"
                  onClick={openResults}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-500 hover:bg-blue-400 text-sm font-medium transition talentlens-interactive"
                >
                  Analyze a job
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

            </div>

          </section>

          <footer className="text-center text-xs text-slate-600 py-5">
            TalentLens AI · Career Intelligence Platform
          </footer>

        </div>

      </main>

    </div>
  );
}

/* =========================================================
   INSIGHT METRIC
========================================================= */

function InsightMetric({
  icon,
  label,
  value,
  description,
  status,
  statusTone,
  accent,
  delay = "",
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
      className={`relative overflow-hidden group bg-[#101827] border border-slate-800/90 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${styles.border} talentlens-fade-up ${delay}`}
    >

      <div
        className={`absolute -right-12 -top-12 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${styles.glow}`}
      />

      <div className="relative flex items-center justify-between">

        <span className="text-sm text-slate-400">
          {label}
        </span>

        <div
          className={`w-9 h-9 rounded-lg ${styles.icon} border border-white/[0.04] flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
        >
          {icon}
        </div>

      </div>

      <h3 className="relative text-3xl font-bold mt-5 tracking-tight tabular-nums">
        {value}
      </h3>

      <p className="relative text-sm text-slate-500 mt-2">
        {description}
      </p>

      <div className="relative flex items-center gap-2 mt-4">

        <span
          className={`w-1.5 h-1.5 rounded-full ${statusTone.replace(
            "text-",
            "bg-"
          )} talentlens-pulse`}
        />

        <p className={`text-xs ${statusTone}`}>
          {status}
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   INTERPRETATION CARD
========================================================= */

function InterpretationCard({
  icon,
  title,
  description,
  tone,
  status,
}) {
  return (
    <div className="group rounded-xl border border-white/[0.06] bg-[#0C1320] p-5 hover:border-white/[0.1] hover:bg-[#0E1727] hover:-translate-y-0.5 transition-all duration-300 talentlens-interactive">

      <div className="flex items-start justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-lg bg-white/[0.03] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            {icon}
          </div>

          <p className="text-sm font-medium">
            {title}
          </p>

        </div>

        <span
          className={`text-[10px] uppercase tracking-wider ${tone}`}
        >
          {status}
        </span>

      </div>

      <p className="text-sm text-slate-400 mt-4 leading-6 group-hover:text-slate-300 transition-colors">
        {description}
      </p>

    </div>
  );
}

/* =========================================================
   PERFORMANCE ROW
========================================================= */

function PerformanceRow({
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

        <span className="text-sm text-slate-300 font-medium tabular-nums">
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

/* =========================================================
   INSIGHT PANEL
========================================================= */

function InsightPanel({
  icon,
  iconBackground,
  title,
  subtitle,
  children,
  delay = "",
}) {
  return (
    <div
      className={`bg-[#101827] border border-slate-800/90 rounded-2xl p-6 talentlens-card talentlens-fade-up ${delay}`}
    >

      <div className="flex items-center gap-3">

        <div
          className={`w-10 h-10 rounded-xl ${iconBackground} border border-white/[0.03] flex items-center justify-center`}
        >
          {icon}
        </div>

        <div>

          <h3 className="text-lg font-semibold">
            {title}
          </h3>

          <p className="text-xs text-slate-500 mt-1">
            {subtitle}
          </p>

        </div>

      </div>

      <div className="mt-6">
        {children}
      </div>

    </div>
  );
}

/* =========================================================
   QUICK ACTION CARD
========================================================= */

function QuickActionCard({
  icon,
  iconBackground,
  title,
  description,
  action,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group text-left relative overflow-hidden bg-[#101827] border border-slate-800/90 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/20 talentlens-fade-up talentlens-interactive"
    >

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/0 to-transparent group-hover:via-blue-500/30 transition-all duration-500" />

      <div
        className={`w-11 h-11 rounded-xl ${iconBackground} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
      >
        {icon}
      </div>

      <h3 className="text-lg font-semibold mt-5">
        {title}
      </h3>

      <p className="text-sm text-slate-400 mt-3 leading-6">
        {description}
      </p>

      <div className="flex items-center gap-2 mt-5 text-cyan-400 text-sm">

        {action}

        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />

      </div>

    </button>
  );
}

/* =========================================================
   INSIGHT ITEM
========================================================= */

function InsightItem({ children }) {
  return (
    <div className="group flex items-start gap-3">

      <div className="w-5 h-5 shrink-0 rounded-full bg-blue-500/10 border border-blue-500/10 flex items-center justify-center mt-0.5 transition-transform duration-300 group-hover:scale-110">

        <CheckCircle2 className="w-3 h-3 text-blue-400" />

      </div>

      <p className="text-sm text-slate-400 leading-6 group-hover:text-slate-300 transition-colors">
        {children}
      </p>

    </div>
  );
}

export default Insights;