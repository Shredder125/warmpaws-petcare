import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { loginUser } from "../../firebase/auth";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password!");
      return;
    }

    setLoading(true);
    try {
      await loginUser(email, password);
      toast.success("Login successful! Redirecting...");
      setTimeout(() => navigate(from), 1000);
    } catch (error) {
      toast.error(error.message || "Login failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      toast.success(
        `Welcome ${result.user.displayName || "User"}! Redirecting...`
      );
      setTimeout(() => navigate(from), 1000);
    } catch (error) {
      toast.error(error.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-6">
          Log in to your WarmPaws account
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
          or{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>{" "}
          if you haven't already!
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
              required
              disabled={loading}
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
            <div className="text-right mt-2">
              <Link
                to="/forgot-password"
                state={{ email }}
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3 text-white font-semibold rounded-lg shadow-md transition-colors ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <button
          onClick={handleGoogleSignIn}
          className={`w-full py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
            loading ? "cursor-not-allowed opacity-70" : ""
          }`}
          disabled={loading}
        >
          <FcGoogle size={24} />
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>

        <p className="mt-4 text-center text-gray-600 dark:text-gray-300 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>

      {/* React Hot Toast */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Login;
