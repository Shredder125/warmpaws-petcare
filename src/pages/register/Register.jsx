import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { registerUser } from "../../firebase/auth";
import { Snowflake } from "lucide-react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();

  const from = location.state?.from?.pathname || "/";

  const validatePassword = (pwd) => {
    if (!/[A-Z]/.test(pwd))
      return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(pwd))
      return "Password must contain at least one lowercase letter.";
    if (pwd.length < 6) return "Password must be at least 6 characters long.";
    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const error = validatePassword(password);
    setPasswordError(error);
    if (error) return;

    setLoading(true);
    try {
      const userCredential = await registerUser(email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL:
          imageUrl ||
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      });
      toast.success("Registration successful! Redirecting...");
      setTimeout(() => navigate(from), 1000);
    } catch (err) {
      toast.error(err.message);
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
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-blue-100 via-white to-blue-50 dark:from-gray-900 dark:to-gray-800 p-6 overflow-hidden">
      <Toaster position="top-right" />
      <Snowflake
        className="absolute top-10 left-10 text-blue-200 opacity-30 animate-pulse"
        size={30}
      />
      <Snowflake
        className="absolute top-32 right-16 text-blue-300 opacity-20 animate-pulse delay-500"
        size={40}
      />
      <Snowflake
        className="absolute bottom-32 left-1/3 text-blue-200 opacity-25 animate-pulse delay-1000"
        size={35}
      />
      <Snowflake
        className="absolute bottom-20 right-1/4 text-blue-300 opacity-20 animate-pulse delay-700"
        size={50}
      />
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10 relative z-10 backdrop-blur-sm space-y-6">
        <h1 className="text-5xl md:text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
          Create Your WarmPaws Account
        </h1>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
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
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${
                passwordError
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              } dark:bg-gray-700 dark:text-white dark:border-gray-600`}
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
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Profile Image URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 text-lg ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <button
          onClick={handleGoogleSignIn}
          className={`w-full py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-md flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
            loading ? "cursor-not-allowed opacity-70" : ""
          }`}
          disabled={loading}
        >
          <FcGoogle size={24} />
          {loading ? "Signing in..." : "Sign up with Google"}
        </button>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-300 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
