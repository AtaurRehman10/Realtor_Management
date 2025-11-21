import { loginUser } from "../api/authApi";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await loginUser(email, password);
      const { token, user } = res;
      localStorage.setItem("authToken", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("name", user.first_name + " " + user.last_name);
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (user.role === "affiliate") {
        navigate("/dashboard");
      } else {
        setError("Unknown role. Contact support.");
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid credentials");
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
        <div className="text-center mb-8 sm:mb-10">
          <img
            src="https://c.animaapp.com/meur8v47FVLTqq/img/67709f63669fc8c6f01fff47-group-25-1.png"
            alt="Munoz Ghezlan Capital Logo"
            className="h-16 sm:h-20 w-auto mx-auto"
          />
        </div>

        {/* Login Form Card */}
        <div className="bg-[#45454580] rounded-lg p-8 sm:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-white text-2xl sm:text-3xl font-semibold">
              Sign In
            </h1>
            <p className="text-gray-300 text-sm leading-relaxed px-2">
              Log in to access your dashboard
            </p>
          </div>

          <div className="space-y-5">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded text-sm">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full h-12 sm:h-14 px-4 bg-gray-700/60 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  className="w-full h-12 sm:h-14 px-4 bg-gray-700/60 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md hover:bg-gray-200 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Forget Password Link */}
            <div className="text-right">
              <button
                onClick={() => navigate("/forgot-password")}
                className="text-white hover:text-[#8B6642] text-sm transition-colors"
              >
                Forget Password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full  bg-gradient-to-r from-[#8E653A] to-[#BF9A68] hover:bg-[#8B6642] text-white font-semibold py-3  transition-all duration-200 rounded-lg  transform hover:scale-105 shadow-lg  disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* Register Link */}
            <div className="text-center text-sm">
              <button
                onClick={() => navigate("/register")}
                className="text-white hover:text-[#8B6642] transition-colors"
              >
                Register as Affiliate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
