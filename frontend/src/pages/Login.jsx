import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
        "http://127.0.0.1:8000/login",
        {
          email: email,
          password: password,
        }
      );

      const token = response.data.access_token;

      // Store JWT token
      localStorage.setItem("access_token", token);

      // Go to dashboard
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


          {/* Error Message */}

          {error && (
            <div className="bg-red-100 text-red-600 border border-red-200 rounded-xl p-3 mb-6 text-sm">
              {error}
            </div>
          )}


          <form onSubmit={handleLogin}>

            {/* Email */}

            <label className="font-semibold">
              Email
            </label>

            <div className="flex items-center border rounded-xl mt-2 mb-6 px-3">

              <Mail
                size={18}
                className="text-gray-500"
              />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 outline-none"
              />

            </div>


            {/* Password */}

            <label className="font-semibold">
              Password
            </label>

            <div className="flex items-center border rounded-xl mt-2 mb-8 px-3">

              <Lock
                size={18}
                className="text-gray-500"
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>


            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl p-4 font-semibold transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>


          {/* Signup */}

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