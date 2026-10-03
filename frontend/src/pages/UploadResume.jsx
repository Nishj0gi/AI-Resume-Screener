import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  Upload,
  X,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  Loader2,
} from "lucide-react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [resumeData, setResumeData] = useState(null);

  const navigate = useNavigate();

  const API_URL =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  const handleFile = (selectedFile) => {
    setError("");
    setSuccess(false);
    setResumeData(null);

    if (!selectedFile) {
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      setFile(null);
      setError("Please upload your resume in PDF format.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setFile(null);
      setError("File size must be less than 5 MB.");
      return;
    }

    setFile(selectedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);

    const droppedFile = event.dataTransfer.files?.[0];

    handleFile(droppedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select your resume first.");
      return;
    }

    setError("");
    setSuccess(false);
    setResumeData(null);

    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${API_URL}/resume/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResumeData(response.data);
      setSuccess(true);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("access_token");
        navigate("/");
        return;
      }

      if (error.response) {
        setError(
          error.response.data?.detail ||
            "Unable to upload your resume."
        );
      } else if (error.request) {
        setError(
          "Unable to connect to the server. Please make sure the backend is running."
        );
      } else {
        setError(
          "Something went wrong while uploading your resume."
        );
      }
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setSuccess(false);
    setResumeData(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#05070D] text-white relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-600/[0.07] blur-[150px] rounded-full pointer-events-none" />

      <div className="absolute bottom-[-250px] right-[-100px] w-[500px] h-[400px] bg-violet-600/[0.07] blur-[150px] rounded-full pointer-events-none" />

      {/* Subtle grid */}
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

          {/* Brand */}
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

          {/* Back */}
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
      <main className="relative z-10 max-w-3xl mx-auto px-6 py-14">

        {/* Page heading */}
        <div className="text-center mb-10">

          <p className="text-[11px] uppercase tracking-[0.2em] text-blue-400 font-medium mb-3">
            Resume Analysis
          </p>

          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Upload your resume
          </h1>

          <p className="text-sm text-slate-500 mt-3 max-w-md mx-auto leading-relaxed">
            Upload your latest resume and let TalentLens analyze
            your skills, experience, and career profile.
          </p>

        </div>

        {/* Upload panel */}
        <div className="bg-[#090C13]/95 border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">

          {/* Panel top */}
          <div className="px-7 py-5 border-b border-white/[0.06] flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/10 flex items-center justify-center">
                <FileText
                  size={16}
                  className="text-blue-400"
                />
              </div>

              <div>
                <p className="text-sm font-medium">
                  Resume document
                </p>

                <p className="text-[11px] text-slate-600">
                  PDF · Maximum 5 MB
                </p>
              </div>

            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
              <ShieldCheck size={13} />
              Secure upload
            </div>

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

            {/* Success */}
            {success && (
              <div className="mb-5 flex items-center gap-3 px-4 py-3 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.05] text-emerald-400 text-sm">

                <Check size={17} />

                <span>
                  Resume uploaded and processed successfully.
                </span>

              </div>
            )}

            {/* Drop zone */}
            {!file ? (
              <label
                onDragEnter={(event) => {
                  event.preventDefault();
                  setDragActive(true);
                }}
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={(event) => {
                  event.preventDefault();
                  setDragActive(false);
                }}
                onDrop={handleDrop}
                className={`
                  group
                  min-h-[280px]
                  border
                  border-dashed
                  rounded-xl
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-center
                  cursor-pointer
                  transition-all
                  ${
                    dragActive
                      ? "border-blue-400 bg-blue-500/[0.06]"
                      : "border-white/[0.10] hover:border-blue-500/40 hover:bg-white/[0.015]"
                  }
                `}
              >

                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={(event) =>
                    handleFile(event.target.files?.[0])
                  }
                />

                <div className="w-14 h-14 rounded-xl border border-white/[0.08] bg-[#0D1119] flex items-center justify-center mb-5 group-hover:border-blue-500/30 group-hover:bg-blue-500/[0.04] transition">

                  <Upload
                    size={22}
                    className="text-slate-500 group-hover:text-blue-400 transition"
                  />

                </div>

                <p className="text-sm font-medium text-slate-200">
                  Drop your resume here
                </p>

                <p className="text-xs text-slate-600 mt-2">
                  or click to browse from your computer
                </p>

                <div className="mt-5 text-[10px] text-slate-700">
                  PDF only · Up to 5 MB
                </div>

              </label>
            ) : (

              /* Selected file */
              <div className="border border-white/[0.08] rounded-xl bg-[#0D1119] p-5">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-4 min-w-0">

                    <div className="w-11 h-11 rounded-lg bg-blue-500/10 border border-blue-500/10 flex items-center justify-center shrink-0">

                      <FileText
                        size={20}
                        className="text-blue-400"
                      />

                    </div>

                    <div className="min-w-0">

                      <p className="text-sm font-medium text-slate-200 truncate">
                        {file.name}
                      </p>

                      <p className="text-xs text-slate-600 mt-1">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>

                    </div>

                  </div>

                  {!uploading && (
                    <button
                      type="button"
                      onClick={removeFile}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:text-white hover:bg-white/[0.05] transition"
                      aria-label="Remove selected resume"
                      title="Remove resume"
                    >
                      <X size={16} />
                    </button>
                  )}

                </div>

                {/* Upload progress */}
                {uploading && (
                  <div className="mt-5 pt-4 border-t border-white/[0.06]">

                    <div className="flex items-center justify-between text-xs mb-2">

                      <span className="text-slate-500">
                        Processing resume...
                      </span>

                      <Loader2
                        size={14}
                        className="text-blue-400 animate-spin"
                      />

                    </div>

                    <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">

                      <div className="h-full w-[70%] bg-gradient-to-r from-blue-500 to-violet-500 rounded-full animate-pulse" />

                    </div>

                  </div>
                )}

                {/* Processed status */}
                {success && (
                  <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs text-emerald-400">

                    <Check size={14} />

                    Resume processed successfully

                  </div>
                )}

              </div>
            )}

            {/* Upload button */}
            {file && !success && (
              <button
                type="button"
                onClick={handleUpload}
                disabled={uploading}
                className="w-full h-12 mt-5 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-400 hover:to-violet-400 disabled:opacity-60 disabled:cursor-not-allowed text-sm font-semibold transition shadow-lg shadow-blue-500/10"
              >

                {uploading ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />

                    Processing resume...
                  </>
                ) : (
                  <>
                    Analyze resume

                    <ArrowRight size={17} />
                  </>
                )}

              </button>
            )}

            {/* Results */}
            {success && resumeData && (
              <div className="mt-7">

                <div className="flex items-center justify-between mb-4">

                  <div>
                    <p className="text-sm font-medium">
                      Resume insights
                    </p>

                    <p className="text-xs text-slate-600 mt-1">
                      Information detected from your resume
                    </p>
                  </div>

                </div>

                {/* Skills */}
                {resumeData.detected_skills &&
                  resumeData.detected_skills.length > 0 && (
                    <div className="border border-white/[0.07] rounded-xl p-5 bg-[#0D1119]">

                      <p className="text-xs font-medium text-slate-400 mb-4">
                        Detected skills
                      </p>

                      <div className="flex flex-wrap gap-2">

                        {resumeData.detected_skills.map(
                          (skill, index) => (
                            <span
                              key={`${skill}-${index}`}
                              className="px-3 py-1.5 rounded-md bg-blue-500/[0.07] border border-blue-500/10 text-xs text-blue-300"
                            >
                              {skill}
                            </span>
                          )
                        )}

                      </div>

                    </div>
                  )}

                {/* Continue */}
                <button
                  type="button"
                  onClick={() => navigate("/results")}
                  className="w-full h-12 mt-5 flex items-center justify-center gap-2 rounded-lg border border-white/[0.10] bg-white/[0.02] hover:bg-white/[0.05] text-sm font-medium transition"
                >
                  Continue to job matching
                  <ArrowRight size={17} />
                </button>

              </div>
            )}

          </div>

        </div>

        {/* Footer note */}
        <div className="flex items-center justify-center gap-2 mt-7 text-[11px] text-slate-700">

          <ShieldCheck size={13} />

          Your resume is processed securely

        </div>

      </main>

    </div>
  );
}

export default UploadResume;