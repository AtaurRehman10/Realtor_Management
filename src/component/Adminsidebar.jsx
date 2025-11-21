import { useNavigate, useLocation } from "react-router-dom";
import {
  Users,
  LogOut,
  Home,
  UserPlus,
  DollarSign,
  Menu,
  X,
  Search,
  Bell,
  User,
} from "lucide-react";
import { useState } from "react";

const Adminsidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const menuItems = [
    { path: "/admin-dashboard", icon: Home, label: "Dashboard" },
    { path: "/admin/realtors", icon: Users, label: "Realtors" },
    { path: "/admin/referrals", icon: UserPlus, label: "Referrals" },
    // { path: "/admin/payouts", icon: DollarSign, label: "Payouts" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#1a1a1a] border-b border-gray-800">
        <div className="flex items-center justify-between p-4">
          <img
            src="https://c.animaapp.com/meur8v47FVLTqq/img/67709f63669fc8c6f01fff47-group-25-1.png"
            alt="Munoz Ghezlan Capital Logo"
            className="h-8 w-auto"
          />
          <div className="flex items-center gap-3">
            <button className="text-gray-400 hover:text-white p-2">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white p-2 relative">
              <Bell className="w-5 h-5" />
            </button>
            <button className="bg-gradient-to-r from-[#8E653A] to-[#BF9A68] text-white p-2 rounded-full">
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 bg-gradient-to-r from-[#8E653A] to-[#BF9A68] rounded-lg"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-70 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed top-0 left-0 right-0 bg-[#454545a6] border-b border-gray-800 z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <img
            src="https://c.animaapp.com/meur8v47FVLTqq/img/67709f63669fc8c6f01fff47-group-25-1.png"
            alt="Munoz Ghezlan Capital Logo"
            className="h-8 w-auto"
          />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 max-h-[calc(100vh-80px)] overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${location.pathname === item.path
                  ? "bg-gradient-to-r from-[#8E653A] to-[#BF9A68] text-white font-medium border-l-4 border-[#BF9A68]"
                  : "text-gray-400 hover:text-white hover:bg-[#454545a6]"
                }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-[#454545a6] rounded-lg transition-all text-left"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <div
        className="hidden lg:flex flex-col w-64 h-screen fixed top-0 left-0 lg:flex-shrink-0 
                   bg-[#45454580] border-r border-gray-800 z-30"
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <img
            src="https://c.animaapp.com/meur8v47FVLTqq/img/67709f63669fc8c6f01fff47-group-25-1.png"
            alt="Munoz Ghezlan Capital Logo"
            className="h-12 w-auto mx-auto"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${location.pathname === item.path
                  ? "bg-gradient-to-r from-[#8E653A] to-[#BF9A68] text-white font-medium border-l-4 border-[#BF9A68]"
                  : "text-gray-400 hover:text-white hover:bg-[#454545a6]"
                }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all text-left"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </nav>
      </div>
    </>
  );
};

export default Adminsidebar;
