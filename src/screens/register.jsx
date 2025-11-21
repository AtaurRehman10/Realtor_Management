import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

const RegisterPage = () => {
     const [formData, setFormData] = useState({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          about: "",
          niche: "",
     });
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState("");

     const navigate = useNavigate();

     const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
     };

     const handleRegister = async () => {
          try {
               setLoading(true);
               setError("");

               await registerUser(formData);
               navigate("/"); // Redirect to login after success
          } catch (err) {
               setError(err.response?.data?.msg || "Registration failed");
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

               <div className="relative w-full max-w-2xl">
                    {/* Logo */}
                    <div className="text-center mb-8 sm:mb-10">
                         <img
                              src="https://c.animaapp.com/meur8v47FVLTqq/img/67709f63669fc8c6f01fff47-group-25-1.png"
                              alt="Munoz Ghezlan Capital Logo"
                              className="h-16 sm:h-20 w-auto mx-auto"
                         />
                    </div>

                    {/* Register Form Card */}
                    <div className="bg-[#45454580] rounded-lg p-8 sm:p-10 shadow-2xl">
                         <div className="text-center mb-8">
                              <h1 className="text-white text-2xl sm:text-3xl font-semibold">
                                   Register
                              </h1>
                              <p className="text-gray-300 text-sm leading-relaxed px-2">
                                   Create your affiliate account
                              </p>
                         </div>

                         <div className="space-y-5">
                              {error && (
                                   <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded text-sm">
                                        {error}
                                   </div>
                              )}

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                   {/* First Name */}
                                   <div>
                                        <label className="block text-white text-sm font-medium mb-2">
                                             First Name
                                        </label>
                                        <input
                                             type="text"
                                             name="first_name"
                                             value={formData.first_name}
                                             onChange={handleChange}
                                             placeholder="First Name"
                                             className="w-full h-12 px-4 bg-gray-700/60 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                                        />
                                   </div>

                                   {/* Last Name */}
                                   <div>
                                        <label className="block text-white text-sm font-medium mb-2">
                                             Last Name
                                        </label>
                                        <input
                                             type="text"
                                             name="last_name"
                                             value={formData.last_name}
                                             onChange={handleChange}
                                             placeholder="Last Name"
                                             className="w-full h-12 px-4 bg-gray-700/60 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                                        />
                                   </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                   {/* Email */}
                                   <div>
                                        <label className="block text-white text-sm font-medium mb-2">
                                             Email Address
                                        </label>
                                        <input
                                             type="email"
                                             name="email"
                                             value={formData.email}
                                             onChange={handleChange}
                                             placeholder="Email"
                                             className="w-full h-12 px-4 bg-gray-700/60 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                                        />
                                   </div>

                                   {/* Phone */}
                                   <div>
                                        <label className="block text-white text-sm font-medium mb-2">
                                             Phone
                                        </label>
                                        <input
                                             type="tel"
                                             name="phone"
                                             value={formData.phone}
                                             onChange={handleChange}
                                             placeholder="Phone Number"
                                             className="w-full h-12 px-4 bg-gray-700/60 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                                        />
                                   </div>
                              </div>

                              {/* Niche */}
                              <div>
                                   <label className="block text-white text-sm font-medium mb-2">
                                        Niche
                                   </label>
                                   <input
                                        type="text"
                                        name="niche"
                                        value={formData.niche}
                                        onChange={handleChange}
                                        placeholder="Real Estate, Luxury, etc."
                                        className="w-full h-12 px-4 bg-gray-700/60 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                                   />
                              </div>

                              {/* About */}
                              <div>
                                   <label className="block text-white text-sm font-medium mb-2">
                                        About
                                   </label>
                                   <textarea
                                        name="about"
                                        value={formData.about}
                                        onChange={handleChange}
                                        placeholder="Tell us about yourself..."
                                        rows="3"
                                        className="w-full p-4 bg-gray-700/60 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 resize-none"
                                   />
                              </div>

                         </div>

                         {/* Register Button */}
                         <button
                              onClick={handleRegister}
                              disabled={loading}
                              className="w-full bg-gradient-to-r from-[#8E653A] to-[#BF9A68] hover:bg-[#8B6642] text-white font-semibold py-3 transition-all duration-200 rounded-lg transform hover:scale-105 shadow-lg disabled:opacity-50 mt-4"
                         >
                              {loading ? "Creating Account..." : "Create Account"}
                         </button>

                         {/* Login Link */}
                         <div className="text-center text-sm pt-4">
                              <button
                                   onClick={() => navigate("/")}
                                   className="text-white hover:text-[#8B6642] transition-colors"
                              >
                                   Already have an account? Sign In
                              </button>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default RegisterPage;
