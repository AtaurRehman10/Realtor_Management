// src/component/RealtorSetting.jsx
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate, useOutletContext } from "react-router-dom";
import RealtorSidebar from "./Realtorsidebar";
import { getRealtorProfile, updateRealtorProfile, updateRealtorPassword, uploadRealtorProfileImage, deleteRealtorProfileImage } from "../api/realtorApi";
import {
  Upload,
  Camera,
  User,
  Lock,
  Mail,
  Link as LinkIcon,
  Eye,
  EyeOff,
  X,
} from "lucide-react";

const RealtorSettings = () => {
  const navigate = useNavigate();
  const { refreshProfile } = useOutletContext();
  const [username, setUsername] = useState("");
  const [activeTab, setActiveTab] = useState("personal");
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Personal Information Form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [affiliateLink, setAffiliateLink] = useState("");

  // Change Password Form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "User";
    setUsername(storedUsername);

    const fetchProfile = async () => {
      try {
        const data = await getRealtorProfile();
        if (data) {
          setFirstName(data.first_name || "");
          setLastName(data.last_name || "");
          setEmail(data.email || "");
          setAffiliateLink(data.unique_affiliate_link || "");
          if (data.profile_image) {
            setProfileImage(data.profile_image);
          }
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Show preview immediately
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload to API
      const formData = new FormData();
      formData.append("profile_image", file);

      try {
        setIsLoading(true);
        const response = await uploadRealtorProfileImage(formData);
        if (response.profile_image) {
          setProfileImage(response.profile_image);
          if (refreshProfile) refreshProfile();
          if (refreshProfile) refreshProfile();
          toast.success("Profile image uploaded successfully!");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload profile image.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteImage = async () => {
    try {
      setIsLoading(true);
      await deleteRealtorProfileImage();
      setProfileImage(null);
      if (refreshProfile) refreshProfile();
      toast.success("Profile image deleted successfully!");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete profile image.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePersonalInfo = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const updatedData = {
        first_name: firstName,
        last_name: lastName,
      };
      await updateRealtorProfile(updatedData);

      // Update localStorage name if needed
      const fullName = `${firstName} ${lastName}`;
      localStorage.setItem("name", fullName);

      if (refreshProfile) refreshProfile();

      if (refreshProfile) refreshProfile();

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error saving personal info:", error);
      toast.error("Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match!");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);
    try {
      const passwordData = {
        currentPassword,
        newPassword,
        confirmPassword,
      };
      await updateRealtorPassword(passwordData);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setConfirmPassword("");

      toast.success("Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error(error.response?.data?.msg || "Failed to change password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#45454580] rounded-xl">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255,255,255,0.15) 10px,
            rgba(255,255,255,0.15) 20px
          )`,
          }}
        ></div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#BF9A68]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8E653A]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Sidebar */}
      <RealtorSidebar />

      {/* Main Content */}
      <div className="relative flex-1 overflow-auto ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 ">
          {/* Settings Content */}
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
            {/* Left Tabs Panel */}
            <div className="w-full lg:w-72">
              <div className="bg-[#45454580] backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 p-2 sm:p-3 sticky top-6">
                <div className="flex lg:flex-col gap-2">
                  <button
                    onClick={() => setActiveTab("personal")}
                    className={`group flex-1 lg:w-full flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 rounded-xl transition-all duration-300 text-sm sm:text-base font-medium ${activeTab === "personal"
                      ? "bg-gradient-to-r from-[#8E653A] to-[#BF9A68] text-white shadow-lg shadow-[#8E653A]/30 scale-[1.02]"
                      : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                      }`}
                  >
                    <User
                      className={`w-5 h-5 transition-transform duration-300 ${activeTab === "personal"
                        ? "scale-110"
                        : "group-hover:scale-110"
                        }`}
                    />
                    <span>Personal Info</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("password")}
                    className={`group flex-1 lg:w-full flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 rounded-xl transition-all duration-300 text-sm sm:text-base font-medium ${activeTab === "password"
                      ? "bg-gradient-to-r from-[#8E653A] to-[#BF9A68] text-white shadow-lg shadow-[#8E653A]/30 scale-[1.02]"
                      : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                      }`}
                  >
                    <Lock
                      className={`w-5 h-5 transition-transform duration-300 ${activeTab === "password"
                        ? "scale-110"
                        : "group-hover:scale-110"
                        }`}
                    />
                    <span>Security</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Content Panel */}
            <div className="flex-1">
              <div className="bg-[#45454580] backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 p-6 sm:p-8 lg:p-10">
                {activeTab === "personal" ? (
                  <div className="animate-fade-in">
                    <div className="mb-8 sm:mb-10">
                      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-2">
                        <User className="w-7 h-7 text-[#BF9A68]" />
                        Personal Information
                      </h2>
                      <p className="text-gray-400 text-sm sm:text-base">
                        Update your profile details and personal information
                      </p>
                    </div>

                    {/* Profile Image Upload */}
                    <div className="flex justify-center mb-6 sm:mb-8">
                      <div className="relative">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-700/60 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden group">
                          {profileImage ? (
                            <>
                              <img
                                src={profileImage}
                                alt="Profile"
                                className="w-full h-full object-cover"
                              />
                              <button
                                onClick={handleDeleteImage}
                                className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full "
                                title="Delete Profile Picture"
                              >
                                <X className="w-8 h-8 text-white" />
                              </button>
                            </>
                          ) : (
                            <div className="text-center">
                              <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-1" />
                              <span className="text-[10px] sm:text-xs text-gray-500">
                                upload image
                              </span>
                            </div>
                          )}
                        </div>
                        <label
                          htmlFor="profile-upload"
                          className="absolute bottom-0 right-0 bg-[#A67C52] hover:bg-[#8B6642] p-1.5 sm:p-2 rounded-full cursor-pointer shadow-lg transition-all"
                        >
                          <Upload className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </label>
                        <input
                          id="profile-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                    </div>

                    {/* Form Fields */}
                    <form
                      onSubmit={handleSavePersonalInfo}
                      className="space-y-5 sm:space-y-6 max-w-3xl mx-auto"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#BF9A68] transition-colors duration-200" />
                          <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                            className="w-full h-12 sm:h-14 pl-12 pr-4 bg-gray-700/50 border-2 border-gray-600/50 rounded-xl text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#8E653A]/50 focus:border-[#BF9A68] transition-all duration-200 hover:border-gray-500/50"
                          />
                        </div>
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#BF9A68] transition-colors duration-200" />
                          <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            className="w-full h-12 sm:h-14 pl-12 pr-4 bg-gray-700/50 border-2 border-gray-600/50 rounded-xl text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#8E653A]/50 focus:border-[#BF9A68] transition-all duration-200 hover:border-gray-500/50"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors duration-200" />
                          <input
                            type="email"
                            value={email}
                            readOnly
                            placeholder="Email Address"
                            className="w-full h-12 sm:h-14 pl-12 pr-4 bg-gray-800/50 border-2 border-gray-700/50 rounded-xl text-gray-400 placeholder-gray-500 text-sm sm:text-base focus:outline-none cursor-not-allowed"
                          />
                        </div>
                        <div className="relative group">
                          <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors duration-200" />
                          <input
                            type="text"
                            value={affiliateLink}
                            readOnly
                            placeholder="Affiliate Link"
                            className="w-full h-12 sm:h-14 pl-12 pr-4 bg-gray-800/50 border-2 border-gray-700/50 rounded-xl text-gray-400 placeholder-gray-500 text-sm sm:text-base focus:outline-none cursor-not-allowed"
                          />
                        </div>
                      </div>

                      <div className="flex justify-center pt-6 sm:pt-8">
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="relative overflow-hidden bg-gradient-to-r from-[#8E653A] to-[#BF9A68] hover:from-[#BF9A68] hover:to-[#8E653A] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-12 sm:px-16 py-3.5 sm:py-4 rounded-xl transition-all duration-300 shadow-lg shadow-[#8E653A]/30 hover:shadow-xl hover:shadow-[#BF9A68]/40 hover:scale-105 text-sm sm:text-base group"
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            {isLoading ? (
                              <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Saving...
                              </>
                            ) : (
                              "Save Changes"
                            )}
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="animate-fade-in">
                    <div className="mb-8 sm:mb-10">
                      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-2">
                        <Lock className="w-7 h-7 text-[#BF9A68]" />
                        Security Settings
                      </h2>
                      <p className="text-gray-400 text-sm sm:text-base">
                        Update your password to keep your account secure
                      </p>
                    </div>

                    {/* Password Form */}
                    <form
                      onSubmit={handleChangePassword}
                      className="flex justify-center"
                    >
                      <div className="space-y-5 sm:space-y-6 w-full max-w-lg">
                        <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#BF9A68] transition-colors duration-200 z-10" />
                          <input
                            type={showCurrentPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Current Password"
                            className="w-full h-12 sm:h-14 pl-12 pr-12 bg-gray-700/50 border-2 border-gray-600/50 rounded-xl text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#8E653A]/50 focus:border-[#BF9A68] transition-all duration-200 hover:border-gray-500/50"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowCurrentPassword(!showCurrentPassword)
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#BF9A68] transition-colors duration-200"
                          >
                            {showCurrentPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>

                        <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#BF9A68] transition-colors duration-200 z-10" />
                          <input
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New Password"
                            className="w-full h-12 sm:h-14 pl-12 pr-12 bg-gray-700/50 border-2 border-gray-600/50 rounded-xl text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#8E653A]/50 focus:border-[#BF9A68] transition-all duration-200 hover:border-gray-500/50"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#BF9A68] transition-colors duration-200"
                          >
                            {showNewPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>

                        <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#BF9A68] transition-colors duration-200 z-10" />
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm New Password"
                            className="w-full h-12 sm:h-14 pl-12 pr-12 bg-gray-700/50 border-2 border-gray-600/50 rounded-xl text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#8E653A]/50 focus:border-[#BF9A68] transition-all duration-200 hover:border-gray-500/50"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#BF9A68] transition-colors duration-200"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>

                        {/* Password Requirements */}
                        <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                          <p className="text-xs sm:text-sm text-gray-400 mb-2 font-medium">
                            Password must contain:
                          </p>
                          <ul className="space-y-1 text-xs text-gray-400">
                            <li className="flex items-center gap-2">
                              <div
                                className={`w-1.5 h-1.5 rounded-full ${newPassword.length >= 8
                                  ? "bg-green-500"
                                  : "bg-gray-500"
                                  }`}
                              ></div>
                              At least 8 characters
                            </li>
                          </ul>
                        </div>

                        <div className="pt-6 sm:pt-8">
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="relative overflow-hidden w-full bg-gradient-to-r from-[#8E653A] to-[#BF9A68] hover:from-[#BF9A68] hover:to-[#8E653A] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 sm:py-4 rounded-xl transition-all duration-300 shadow-lg shadow-[#8E653A]/30 hover:shadow-xl hover:shadow-[#BF9A68]/40 hover:scale-[1.02] text-sm sm:text-base group"
                          >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                              {isLoading ? (
                                <>
                                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                  Updating Password...
                                </>
                              ) : (
                                <>
                                  <Lock className="w-5 h-5" />
                                  Update Password
                                </>
                              )}
                            </span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RealtorSettings;
