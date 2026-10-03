import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  FileText,
  Loader2,
  Sparkles,
  Target,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  ShieldCheck,
  Layers3,
} from "lucide-react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Results() {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const navigate = useNavigate();

  const API_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  const handleMatch = async () => {
    setError("");

    if (!jobDescription.trim()) {
      setError("Please paste a job description first.");
      return;
    }

    if (jobDescription.trim().length < 30) {
      setError(
        "Please provide a more complete job description for a meaningful analysis."
      );
      return;
    }

    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const response = await axios.post(
        `${API_URL}/resume/match`,
        {
          job_description: jobDescription.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("access_token");
        navigate("/");
        return;
      }

      if (error.response?.status === 404) {
        setError(
          "No uploaded resume was found. Please upload your resume first."
        );
        return;
      }

      if (error.response) {
        setError(
          error.response.data?.detail ||
            "Unable to analyze this job description."
        );
      } else if (error.request) {
        setError(
          "Unable to connect to the server. Please make sure the backend is running."
        );
      } else {
        setError(
          "Something went wrong while analyzing the job description."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const sectionsFound = Array.isArray(result?.sections_found)
    ? result.sections_found
    : [];

  const sectionsTotal = result?.sections_total ?? 7;

  return (
    <div className="min-h-screen bg-[#05070D] text-white relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-600/[0.07] blur-[150px] rounded-full pointer-events-none" />

      <div className="absolute bottom-[-250px] right-[-100px] w-[500px] h-[400px] bg-violet-600/[0.07] blur-[150px] rounded-full pointer-events-none" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Header */}
      <header className="relative z-10 border-b border-white/[0.06]">

        <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">

          <Link
            to="/dashboard"
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Sparkles size={18} />
            </div>

            <div>
              <div className="text-[16px] font-semibold tracking-tight">
                TalentLens
              </div>

              <div className="text-[8px] tracking-[0.18em] text-slate-600 uppercase">
                AI Career Intelligence
              </div>
            </div>
          </Link>

          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-200 transition"
          >
            <ArrowLeft size={16} />
            Dashboard
          </Link>

        </div>

      </header>

      {/* Main */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-14">

        {/* Heading */}
        <div className="text-center mb-10">

          <p className="text-[11px] uppercase tracking-[0.2em] text-violet-400 font-medium mb-3">
            Job Compatibility
          </p>

          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Match your resume to an opportunity
          </h1>

          <p className="text-sm text-slate-500 mt-3 max-w-lg mx-auto leading-relaxed">
            Paste a job description and TalentLens will compare
            it with your uploaded resume to identify matching
            skills and potential gaps.
          </p>

        </div>

        {/* Input panel */}
        <div className="bg-[#090C13]/95 border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">

          {/* Panel header */}
          <div className="px-7 py-5 border-b border-white/[0.06] flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/10 flex items-center justify-center">
                <BriefcaseBusiness
                  size={16}
                  className="text-violet-400"
                />
              </div>

              <div>
                <p className="text-sm font-medium">
                  Job description
                </p>

                <p className="text-[11px] text-slate-600">
                  Paste the complete role description
                </p>
              </div>

            </div>

            <span
              className={`text-[10px] ${
                jobDescription.length >= 4800
                  ? "text-amber-400"
                  : "text-slate-600"
              }`}
            >
              {jobDescription.length}/5000
            </span>

          </div>

          <div className="p-7">

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

            {/* Textarea */}
            <textarea
              value={jobDescription}
              onChange={(event) => {
                setJobDescription(
                  event.target.value.slice(0, 5000)
                );
                setError("");
              }}
              placeholder={`Paste the job description here...

Example:
• Required skills
• Responsibilities
• Qualifications
• Experience
• Technical requirements`}
              disabled={loading}
              className="w-full min-h-[300px] resize-y bg-[#0D1119] border border-white/[0.08] rounded-xl px-5 py-4 text-sm text-slate-200 placeholder:text-slate-700 outline-none transition focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/10 leading-relaxed disabled:opacity-60"
            />

            {/* Resume status */}
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-lg bg-emerald-500/[0.07] border border-emerald-500/10 flex items-center justify-center">

                  <FileText
                    size={16}
                    className="text-emerald-400"
                  />

                </div>

                <div>
                  <p className="text-xs font-medium text-slate-300">
                    Resume ready
                  </p>

                  <p className="text-[10px] text-slate-600 mt-0.5">
                    Your latest uploaded resume will be used
                  </p>
                </div>

                <Check
                  size={14}
                  className="text-emerald-400"
                />

              </div>

              <div className="flex items-center gap-2 text-[10px] text-slate-600">

                <ShieldCheck size={13} />

                Secure analysis

              </div>

            </div>

            {/* Analyze */}
            <button
              type="button"
              onClick={handleMatch}
              disabled={loading}
              className="w-full h-12 mt-6 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-400 hover:to-violet-400 disabled:opacity-60 disabled:cursor-not-allowed text-sm font-semibold transition shadow-lg shadow-blue-500/10"
            >

              {loading ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />

                  Analyzing compatibility...
                </>
              ) : (
                <>
                  Analyze compatibility
                  <ArrowRight size={17} />
                </>
              )}

            </button>

          </div>

        </div>

        {/* Results */}
        {result && (
          <div className="mt-10 space-y-5">

            {/* Main score */}
            <div className="bg-[#090C13]/95 border border-white/[0.08] rounded-2xl p-7">

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.18em] text-blue-400 font-medium">
                    Compatibility analysis
                  </p>

                  <h2 className="text-2xl font-semibold mt-2">
                    Your job match
                  </h2>

                  <p className="text-xs text-slate-600 mt-2">
                    Based on your uploaded resume and the
                    provided job description.
                  </p>

                </div>

                <div className="flex items-center gap-5">

                  <div className="w-20 h-20 rounded-full border border-blue-500/20 bg-blue-500/[0.05] flex flex-col items-center justify-center">

                    <Target
                      size={16}
                      className="text-blue-400 mb-1"
                    />

                    <span className="text-xl font-semibold">
                      {result.match_percentage ?? 0}%
                    </span>

                  </div>

                  <div>

                    <p className="text-xs text-slate-500">
                      Resume score
                    </p>

                    <p className="text-2xl font-semibold mt-1">
                      {result.resume_score ?? 0}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <MetricCard
                icon={<TrendingUp size={16} />}
                label="Content score"
                value={`${result.content_score ?? 0}`}
                color="blue"
              />

              <MetricCard
                icon={<Target size={16} />}
                label="Skill score"
                value={`${result.skill_score ?? 0}`}
                color="violet"
              />

              <MetricCard
                icon={<Layers3 size={16} />}
                label="Sections found"
                value={`${sectionsFound.length}/${sectionsTotal}`}
                color="cyan"
              />

            </div>

            {/* Detected resume sections */}
            <div className="bg-[#090C13]/95 border border-white/[0.08] rounded-xl p-6">

              <div className="flex items-center justify-between mb-4">

                <div className="flex items-center gap-3">

                  <div className="w-8 h-8 rounded-lg bg-cyan-500/[0.07] border border-cyan-500/10 flex items-center justify-center">

                    <Layers3
                      size={16}
                      className="text-cyan-400"
                    />

                  </div>

                  <div>

                    <p className="text-sm font-medium">
                      Resume sections detected
                    </p>

                    <p className="text-[11px] text-slate-600">
                      Sections identified in your uploaded resume
                    </p>

                  </div>

                </div>

                <span className="text-xs text-cyan-400">
                  {sectionsFound.length}/{sectionsTotal}
                </span>

              </div>

              {sectionsFound.length > 0 ? (
                <div className="flex flex-wrap gap-2">

                  {sectionsFound.map((section, index) => (
                    <span
                      key={`${section}-${index}`}
                      className="px-3 py-1.5 rounded-md bg-cyan-500/[0.06] border border-cyan-500/10 text-xs text-cyan-400 capitalize"
                    >
                      {section}
                    </span>
                  ))}

                </div>
              ) : (
                <p className="text-xs text-slate-600">
                  No standard resume sections were detected.
                </p>
              )}

            </div>

            {/* Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <SkillPanel
                title="Matched skills"
                skills={result.matched_skills}
                type="matched"
              />

              <SkillPanel
                title="Skill gaps"
                skills={result.missing_skills}
                type="missing"
              />

            </div>

            {/* Recommendations */}
            {Array.isArray(result.recommendations) &&
              result.recommendations.length > 0 && (
                <div className="bg-[#090C13]/95 border border-white/[0.08] rounded-2xl p-7">

                  <div className="flex items-center gap-3 mb-5">

                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/10 flex items-center justify-center">

                      <Lightbulb
                        size={16}
                        className="text-amber-400"
                      />

                    </div>

                    <div>

                      <p className="text-sm font-medium">
                        Improvement insights
                      </p>

                      <p className="text-[11px] text-slate-600">
                        Areas worth strengthening
                      </p>

                    </div>

                  </div>

                  <div className="space-y-3">

                    {result.recommendations.map(
                      (recommendation, index) => (
                        <div
                          key={`${recommendation}-${index}`}
                          className="flex gap-3 text-sm text-slate-400 leading-relaxed"
                        >

                          <span className="text-blue-400 mt-1">
                            {index + 1}
                          </span>

                          <span>
                            {recommendation}
                          </span>

                        </div>
                      )
                    )}

                  </div>

                </div>
              )}

            {/* New analysis */}
            <button
              type="button"
              onClick={() => {
                setResult(null);
                setJobDescription("");
                setError("");
              }}
              className="w-full h-11 rounded-lg border border-white/[0.08] hover:bg-white/[0.03] text-sm text-slate-400 hover:text-white transition"
            >
              Analyze another opportunity
            </button>

          </div>
        )}

        {/* Bottom */}
        {!result && (
          <div className="flex items-center justify-center gap-2 mt-7 text-[11px] text-slate-700">

            <ShieldCheck size={13} />

            Your resume data remains protected

          </div>
        )}

      </main>
    </div>
  );
}


/* ---------------------------------------------------------
   Metric Card
--------------------------------------------------------- */

function MetricCard({
  icon,
  label,
  value,
  color,
}) {
  const colorClasses = {
    blue:
      "text-blue-400 bg-blue-500/[0.07] border-blue-500/10",

    violet:
      "text-violet-400 bg-violet-500/[0.07] border-violet-500/10",

    cyan:
      "text-cyan-400 bg-cyan-500/[0.07] border-cyan-500/10",
  };

  return (
    <div className="bg-[#090C13]/95 border border-white/[0.08] rounded-xl p-5">

      <div className="flex items-center gap-3">

        <div
          className={`w-8 h-8 rounded-lg border flex items-center justify-center ${colorClasses[color]}`}
        >
          {icon}
        </div>

        <p className="text-xs text-slate-500">
          {label}
        </p>

      </div>

      <p className="text-2xl font-semibold mt-4">
        {value}
      </p>

    </div>
  );
}


/* ---------------------------------------------------------
   Skill Panel
--------------------------------------------------------- */

function SkillPanel({
  title,
  skills,
  type,
}) {
  const isMatched = type === "matched";

  return (
    <div className="bg-[#090C13]/95 border border-white/[0.08] rounded-xl p-6">

      <div className="flex items-center justify-between mb-4">

        <p className="text-sm font-medium">
          {title}
        </p>

        <span className="text-[10px] text-slate-600">
          {skills?.length ?? 0}
        </span>

      </div>

      {skills && skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">

          {skills.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className={
                isMatched
                  ? "px-2.5 py-1.5 rounded-md bg-emerald-500/[0.06] border border-emerald-500/10 text-xs text-emerald-400"
                  : "px-2.5 py-1.5 rounded-md bg-amber-500/[0.06] border border-amber-500/10 text-xs text-amber-400"
              }
            >
              {skill}
            </span>
          ))}

        </div>
      ) : (
        <p className="text-xs text-slate-600">
          No items identified.
        </p>
      )}

    </div>
  );
}


export default Results;