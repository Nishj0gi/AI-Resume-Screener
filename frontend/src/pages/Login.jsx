import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex">

      {/* Left Panel */}

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 via-indigo-600 to-purple-700 text-white justify-center items-center">

        <div className="max-w-md text-center">

          <h1 className="text-6xl font-bold mb-6">
            TalentLens AI
          </h1>

          <p className="text-xl leading-relaxed">
            Intelligent Resume Screening & Candidate Ranking Platform
          </p>

        </div>

      </div>

      {/* Right Panel */}

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-slate-100">

        <div className="bg-white shadow-2xl rounded-3xl p-10 w-[430px]">

          <h2 className="text-4xl font-bold text-center">
            Welcome Back
          </h2>

          <p className="text-center text-gray-500 mt-2 mb-8">
            Login to continue
          </p>

          {/* Email */}

          <label className="font-semibold">
            Email
          </label>

          <div className="flex items-center border rounded-xl mt-2 mb-6 px-3">

            <Mail size={18} className="text-gray-500"/>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-4 outline-none"
            />

          </div>

          {/* Password */}

          <label className="font-semibold">
            Password
          </label>

          <div className="flex items-center border rounded-xl mt-2 mb-8 px-3">

            <Lock size={18} className="text-gray-500"/>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="w-full p-4 outline-none"
            />

            <button
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
            </button>

          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-4 font-semibold transition">

            Login

          </button>

          <p className="text-center mt-6">

            Don't have an account?{" "}

            <Link
              to="/signup"
              className="text-blue-600 font-semibold"
            >
              Sign Up
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;