import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {

  const [showPassword, setShowPassword] = useState(false);

  return (

    <div className="min-h-screen flex">

      {/* Left */}

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-700 text-white justify-center items-center">

        <div className="text-center max-w-md">

          <h1 className="text-6xl font-bold mb-6">
            Join TalentLens AI
          </h1>

          <p className="text-xl leading-relaxed">
            Create your account and start screening resumes using AI.
          </p>

        </div>

      </div>

      {/* Right */}

      <div className="w-full lg:w-1/2 bg-slate-100 flex justify-center items-center">

        <div className="bg-white rounded-3xl shadow-2xl p-10 w-[450px]">

          <h2 className="text-4xl font-bold text-center">
            Create Account
          </h2>

          <p className="text-center text-gray-500 mt-2 mb-8">
            Signup to continue
          </p>

          {/* Name */}

          <label className="font-semibold">
            Full Name
          </label>

          <div className="flex items-center border rounded-xl mt-2 mb-5 px-3">

            <User size={18} className="text-gray-500"/>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-4 outline-none"
            />

          </div>

          {/* Email */}

          <label className="font-semibold">
            Email
          </label>

          <div className="flex items-center border rounded-xl mt-2 mb-5 px-3">

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
              placeholder="Create password"
              className="w-full p-4 outline-none"
            />

            <button
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
            </button>

          </div>

          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-4 font-semibold transition">

            Create Account

          </button>

          <p className="text-center mt-6">

            Already have an account?{" "}

            <Link
              to="/"
              className="text-blue-600 font-semibold"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>

  );
}

export default Signup;