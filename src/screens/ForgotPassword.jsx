import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { forgotPassword } from "../api/authApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setError("");
    setMsg("");

    // Validate email
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const response = await forgotPassword(email);
      setMsg("Password reset instructions have been sent to your email");
      setEmail(""); // Clear the email field
    } catch (err) {
      console.error("Forgot password error:", err);
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to send reset email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://c.animaapp.com/meu8kae0jVrFXq/img/bg.png')] bg-cover bg-no-repeat bg-center flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255,255,255,0.1) 10px,
            rgba(255,255,255,0.1) 20px
          )`,
          }}
        ></div>
      </div>

      <div className="relative w-full max-w-sm sm:max-w-md">
        {/* Logo */}
        <div className="text-center mb-6 sm:mb-8">
          <img
            src="https://c.animaapp.com/meur8v47FVLTqq/img/67709f63669fc8c6f01fff47-group-25-1.png"
            alt="Munoz Ghezlan Capital Logo"
            className="h-12 sm:h-16 w-auto mx-auto"
          />
        </div>

        {/* Card */}
        <div className="bg-[#45454580] backdrop-blur-sm rounded-lg p-6 sm:p-8 shadow-2xl">
          <h1 className="text-white text-xl sm:text-2xl font-semibold mb-4 text-center">
            Reset Password
          </h1>
          <p className="text-gray-300 text-sm text-center mb-6">
            Enter your email address and we’ll send you a reset link.
          </p>

          {error && (
            <div className="bg-red-600/80 text-white p-2 rounded text-sm mb-4">
              {error}
            </div>
          )}
          {msg && (
            <div className="bg-green-600/80 text-white p-2 rounded text-sm mb-4">
              {msg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="w-full h-12 sm:h-14 px-4 mb-4 bg-gray-700/60 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#8E653A] to-[#BF9A68] hover:opacity-90 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-lg disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-300">
            Remembered your password?{" "}
            <button
              onClick={() => navigate("/")}
              className="text-[#FFDEA4] hover:text-amber-300 underline"
            >
              Back to Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
