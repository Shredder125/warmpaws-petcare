import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const prefilledEmail = location.state?.email || "";
  const [email, setEmail] = useState(prefilledEmail);
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email!");

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Redirecting to Gmail...");
      setTimeout(() => {
        window.open("https://mail.google.com/", "_blank");
      }, 1500);
    } catch (err) {
      toast.error(err.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    document.getElementById("reset-email")?.focus();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <form
        onSubmit={handleReset}
        className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Reset Your Password
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
          Enter your email to receive a password reset link.
        </p>
        <input
          id="reset-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
          disabled={loading}
        />
        <button
          type="submit"
          className={`w-full p-3 rounded-lg font-semibold text-white shadow-md transition-colors ${
            loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Reset Password"}
        </button>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Remember your password?{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Log in
          </span>
        </p>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
