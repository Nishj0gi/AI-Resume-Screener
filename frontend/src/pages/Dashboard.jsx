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
  TrendingUp,
  BriefcaseBusiness,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-white flex">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="hidden lg:flex w-64 bg-[#0f172a] border-r border-slate-800 flex-col">

        {/* Logo */}
        <div className="px-6 py-7 border-b border-slate-800">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Sparkles size={21} />
            </div>

            <div>
              <h1 className="font-bold text-lg tracking-tight">
                TalentLens
              </h1>

              <p className="text-xs text-slate-500">
                AI Career Intelligence
              </p>
            </div>

          </div>

        </div>


        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">

          <p className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Workspace
          </p>

          <button
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/10"
          >
            <LayoutDashboard size={19} />
            <span className="text-sm font-medium">
              Overview
            </span>
          </button>

          <button
            onClick={() => navigate("/upload-resume")}
            className="w-full flex items-center gap-3 px-3 py-3 mt-2 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <FileText size={19} />
            <span className="text-sm font-medium">
              Resume
            </span>
          </button>

          <button
            onClick={() => navigate("/results")}
            className="w-full flex items-center gap-3 px-3 py-3 mt-2 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <Target size={19} />
            <span className="text-sm font-medium">
              Job Matching
            </span>
          </button>


          <p className="px-3 mt-9 mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Account
          </p>

          <button
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <Sparkles size={19} />
            <span className="text-sm font-medium">
              Insights
            </span>
          </button>

          <button
            className="w-full flex items-center gap-3 px-3 py-3 mt-2 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <Settings size={19} />
            <span className="text-sm font-medium">
              Settings
            </span>
          </button>

        </nav>


        {/* User / Logout */}
        <div className="p-4 border-t border-slate-800">

          <div className="flex items-center gap-3 p-3 mb-2 rounded-xl bg-slate-800/50">

            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center font-bold text-sm">
              N
            </div>

            <div className="flex-1 min-w-0">

              <p className="text-sm font-semibold truncate">
                Nishmitha
              </p>

              <p className="text-xs text-slate-500">
                Candidate
              </p>

            </div>

          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">
              Logout
            </span>
          </button>

        </div>

      </aside>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="flex-1 min-w-0 overflow-y-auto">

        {/* Top bar */}
        <header className="h-20 border-b border-slate-800 bg-[#0b1120]/90 backdrop-blur flex items-center justify-between px-6 lg:px-10">

          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">
              Dashboard
            </p>

            <h2 className="text-lg font-semibold text-white">
              Career Intelligence
            </h2>
          </div>

          <button
            onClick={() => navigate("/upload-resume")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2.5 rounded-xl text-sm font-semibold transition shadow-lg shadow-blue-600/20"
          >
            <Upload size={17} />
            Upload Resume
          </button>

        </header>


        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">


          {/* =================================================
              HERO
          ================================================= */}

          <section className="mb-10">

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">

              <div>

                <p className="text-blue-400 text-sm font-medium mb-3">
                  Welcome back, Nishmitha
                </p>

                <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
                  Understand your career fit.
                </h1>

                <p className="text-slate-400 mt-3 max-w-2xl leading-relaxed">
                  Analyze your resume, compare it with job requirements,
                  identify skill gaps, and discover opportunities to improve.
                </p>

              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500">

                <div className="w-2 h-2 rounded-full bg-emerald-400" />

                System operational

              </div>

            </div>

          </section>


          {/* =================================================
              STAT CARDS
          ================================================= */}

          <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">


            {/* Resume Score */}
            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm text-slate-500">
                    Resume Score
                  </p>

                  <p className="text-3xl font-bold mt-3">
                    82.86
                  </p>

                </div>

                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <FileText size={20} />
                </div>

              </div>

              <div className="flex items-center gap-2 mt-5 text-xs text-emerald-400">

                <TrendingUp size={14} />

                <span>
                  Strong profile structure
                </span>

              </div>

            </div>


            {/* Job Match */}
            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm text-slate-500">
                    Latest Job Match
                  </p>

                  <p className="text-3xl font-bold mt-3">
                    100%
                  </p>

                </div>

                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <Target size={20} />
                </div>

              </div>

              <div className="flex items-center gap-2 mt-5 text-xs text-emerald-400">

                <CheckCircle2 size={14} />

                <span>
                  No critical skill gaps
                </span>

              </div>

            </div>


            {/* Skills */}
            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm text-slate-500">
                    Detected Skills
                  </p>

                  <p className="text-3xl font-bold mt-3">
                    11
                  </p>

                </div>

                <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center">
                  <Sparkles size={20} />
                </div>

              </div>

              <div className="mt-5 text-xs text-slate-500">
                Across your uploaded resume
              </div>

            </div>

          </section>


          {/* =================================================
              MAIN ACTION AREA
          ================================================= */}

          <section className="grid lg:grid-cols-3 gap-5 mb-8">


            {/* Upload */}
            <div className="lg:col-span-2 bg-gradient-to-br from-blue-600/15 via-[#111827] to-[#111827] border border-blue-500/20 rounded-2xl p-7 relative overflow-hidden">

              <div className="absolute -right-16 -top-16 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />

              <div className="relative">

                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
                  <FileText size={23} />
                </div>

                <h3 className="text-xl font-bold">
                  Analyze a new resume
                </h3>

                <p className="text-slate-400 mt-2 max-w-lg leading-relaxed">
                  Upload a PDF resume and let TalentLens extract
                  your skills, structure, and career information.
                </p>

                <button
                  onClick={() => navigate("/upload-resume")}
                  className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl text-sm font-semibold transition"
                >
                  Upload Resume
                  <ArrowUpRight size={17} />
                </button>

              </div>

            </div>


            {/* Match */}
            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-7">

              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6">
                <BriefcaseBusiness size={23} />
              </div>

              <h3 className="text-xl font-bold">
                Match a job
              </h3>

              <p className="text-slate-400 mt-2 text-sm leading-relaxed">
                Compare your resume against a job description
                and discover your compatibility.
              </p>

              <button
                onClick={() => navigate("/results")}
                className="mt-6 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition"
              >
                View latest analysis
                <ChevronRight size={17} />
              </button>

            </div>

          </section>


          {/* =================================================
              HOW IT WORKS
          ================================================= */}

          <section className="bg-[#111827] border border-slate-800 rounded-2xl p-7">

            <div className="flex items-center justify-between mb-7">

              <div>

                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Workflow
                </p>

                <h3 className="text-xl font-bold mt-1">
                  How TalentLens works
                </h3>

              </div>

            </div>


            <div className="grid md:grid-cols-3 gap-6">


              {/* Step 1 */}
              <div className="relative">

                <div className="flex items-center gap-4">

                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-semibold">
                    01
                  </div>

                  <div>

                    <h4 className="font-semibold">
                      Upload
                    </h4>

                    <p className="text-sm text-slate-500 mt-1">
                      Add your PDF resume.
                    </p>

                  </div>

                </div>

              </div>


              {/* Step 2 */}
              <div>

                <div className="flex items-center gap-4">

                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-semibold">
                    02
                  </div>

                  <div>

                    <h4 className="font-semibold">
                      Analyze
                    </h4>

                    <p className="text-sm text-slate-500 mt-1">
                      Extract skills and resume data.
                    </p>

                  </div>

                </div>

              </div>


              {/* Step 3 */}
              <div>

                <div className="flex items-center gap-4">

                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center font-semibold">
                    03
                  </div>

                  <div>

                    <h4 className="font-semibold">
                      Match
                    </h4>

                    <p className="text-sm text-slate-500 mt-1">
                      Measure job compatibility.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* Footer */}
          <div className="text-center text-xs text-slate-600 mt-10 pb-4">
            TalentLens AI · Career Intelligence Platform
          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;