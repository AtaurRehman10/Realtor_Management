import { User } from "lucide-react";

const Header = ({ username, profileImage, role = "Realtor" }) => {
  return (
    <div className="relative mb-8 sm:mb-10">
      {/* Background Gradient Effect */}
      <div className="absolute -top-20 left-0 w-72 h-72 bg-[#8E653A]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
        {/* Welcome Section */}
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">
            Welcome back,{" "}
            <span className="bg-[#BF9A68] bg-clip-text text-transparent">
              {username}
            </span>
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            Here's what's happening with your account today
          </p>
        </div>

        {/* User Profile Section */}
        <div className="hidden sm:flex items-center gap-3 sm:gap-4 bg-gray-800/60 backdrop-blur-xl px-4 sm:px-5 py-3 rounded-xl shadow-lg border border-gray-700/50 hover:border-[#8E653A]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#8E653A]/20 group">
          {/* Avatar */}
          <div className="relative">
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-r from-[#8E653A] to-[#BF9A68] rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg group-hover:scale-110 transition-transform duration-300 overflow-hidden">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={username}
                  className="w-full h-full object-cover"
                />
              ) : (
                username.charAt(0).toUpperCase()
              )}
            </div>
            {/* Online Status Indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-gray-800 rounded-full"></div>
          </div>

          {/* User Info */}
          <div className="text-left">
            <div className="font-semibold text-white text-sm sm:text-base group-hover:text-[#BF9A68] transition-colors">
              {username}
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{role}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
