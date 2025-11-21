// src/component/RealtorReferrals.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RealtorSidebar from "./Realtorsidebar";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  User,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { getRealtorReferrals } from "../api/realtorApi";

const RealtorReferrals = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [referrals, setReferrals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalReferrals, setTotalReferrals] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    // Try to get from localStorage first for immediate display
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setUsername(storedName.split(" ")[0]);
    }
  }, []);

  const fetchReferrals = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getRealtorReferrals(currentPage, itemsPerPage);
      if (response.success || response.data) {
        setReferrals(response.data || []);
        setTotalPages(response.totalPages || 1);
        setTotalReferrals(response.totalContacts || 0); // Using totalContacts based on screenshot
      }
    } catch (err) {
      console.error("Failed to fetch referrals:", err);
      setError("Failed to load referrals. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, [currentPage]);

  // Filter referrals based on search term (Client-side filtering on current page data)
  const filteredReferrals = referrals.filter((referral) => {
    if (searchTerm.trim() === "") return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      referral.firstName?.toLowerCase().includes(searchLower) ||
      referral.lastName?.toLowerCase().includes(searchLower) ||
      referral.email?.toLowerCase().includes(searchLower) ||
      referral.phone?.toLowerCase().includes(searchLower)
    );
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Exporting referrals...");
  };

  return (
    <div>
      {/* Gradient Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#BF9A68]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8E653A]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Sidebar */}
      <RealtorSidebar />

      {/* Main Content */}
      <div className="relative flex-1 overflow-auto ">
        <div className="p-4 lg:p-8">
          {/* Search and Actions Bar */}
          <div className="mb-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-200" />
              <input
                type="text"
                placeholder="Search by name, email, phone, or realtor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 sm:h-14 pl-12 pr-4 bg-[#51505027] backdrop-blur-xl border-2 border-gray-700/50 rounded-xl text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#8E653A]/50 focus:border-[#BF9A68] transition-all duration-200 hover:border-gray-600/50"
              />
            </div>
          </div>

          {/* Stats Summary */}
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#4545456b] backdrop-blur-xl rounded-xl p-4 border border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-[#8E653A] to-[#BF9A68] p-2 rounded-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">
                    Total Referrals
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-white">
                    {totalReferrals}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#4545456b] backdrop-blur-xl rounded-xl p-4 border border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-[#8E653A] to-[#BF9A68] p-2 rounded-lg">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">
                    Filtered Results
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-white">
                    {filteredReferrals.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#4545456b] backdrop-blur-xl rounded-xl p-4 border border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-[#8E653A] to-[#BF9A68] p-2 rounded-lg">
                  <UserPlus className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">
                    This Month
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-white">0</p>
                </div>
              </div>
            </div>
          </div>

          {/* Referrals Table */}
          <div className="bg-[#4545456b] backdrop-blur-xl rounded-2xl shadow-lg border border-gray-700/50 overflow-hidden">
            <div className="p-5 sm:p-7 border-b border-gray-700/50 bg-[#454545a6]">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-[#8E653A] to-[#BF9A68] p-2 rounded-lg">
                  <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    All Referrals
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                    {filteredReferrals.length}{" "}
                    {filteredReferrals.length === 1 ? "referral" : "referrals"}{" "}
                    found
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="block lg:hidden">
              {isLoading ? (
                <div className="px-4 py-16 text-center">
                  <div className="flex justify-center items-center gap-2 text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin text-[#BF9A68]" />
                    <span>Loading referrals...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="px-4 py-16 text-center">
                  <div className="text-red-400">
                    <p className="mb-3">{error}</p>
                    <button
                      onClick={fetchReferrals}
                      className="inline-flex items-center gap-2 text-sm text-[#BF9A68] hover:text-[#8E653A] transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Try Again
                    </button>
                  </div>
                </div>
              ) : filteredReferrals.length === 0 ? (
                <div className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <Users className="w-12 h-12 sm:w-16 sm:h-16 mb-4 text-gray-600" />
                    <p className="text-base sm:text-lg font-medium text-gray-300">
                      {searchTerm
                        ? "No matching referrals found"
                        : "No referrals yet"}
                    </p>
                    <p className="text-xs sm:text-sm mt-1 px-4 text-gray-500">
                      {searchTerm
                        ? "Try adjusting your search criteria"
                        : "Your referrals will appear here once you start sharing your affiliate link"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-gray-700/50">
                  {filteredReferrals.map((referral, index) => (
                    <div
                      key={index}
                      className="p-4 sm:p-5 space-y-3 hover:bg-[#4545456b] transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-semibold text-[#BF9A68] uppercase tracking-wide flex items-center gap-1">
                          <User className="w-3 h-3" />
                          Name
                        </span>
                        <span className="text-sm text-white font-medium text-right ml-4">
                          {referral.firstName} {referral.lastName}
                        </span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-semibold text-[#BF9A68] uppercase tracking-wide flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          Email
                        </span>
                        <span className="text-sm text-gray-300 break-all text-right ml-4">
                          {referral.email}
                        </span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-semibold text-[#BF9A68] uppercase tracking-wide flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          Phone
                        </span>
                        <span className="text-sm text-gray-300 text-right ml-4">
                          {referral.phone}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#4545456b]">
                    <th className="px-6 py-4 text-left text-sm font-bold text-[#BF9A68] uppercase tracking-wide">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Name
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-[#BF9A68] uppercase tracking-wide">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-[#BF9A68] uppercase tracking-wide">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan="3" className="px-6 py-16 text-center">
                        <div className="flex justify-center items-center gap-2 text-gray-400">
                          <Loader2 className="w-6 h-6 animate-spin text-[#BF9A68]" />
                          <span>Loading referrals...</span>
                        </div>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="3" className="px-6 py-16 text-center">
                        <div className="text-red-400">
                          <p className="mb-3">{error}</p>
                          <button
                            onClick={fetchReferrals}
                            className="inline-flex items-center gap-2 text-sm text-[#BF9A68] hover:text-[#8E653A] transition-colors"
                          >
                            <RefreshCw className="w-4 h-4" />
                            Try Again
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : filteredReferrals.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <Users className="w-16 h-16 mb-4 text-gray-600" />
                          <p className="text-lg font-medium text-gray-300">
                            {searchTerm
                              ? "No matching referrals found"
                              : "No referrals yet"}
                          </p>
                          <p className="text-sm mt-1 text-gray-500">
                            {searchTerm
                              ? "Try adjusting your search criteria"
                              : "Your referrals will appear here once you start sharing your affiliate link"}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredReferrals.map((referral, index) => (
                      <tr
                        key={index}
                        className="border-t border-gray-700/50 hover:bg-[#4545456b] transition-colors duration-200"
                      >
                        <td className="px-6 py-4 text-sm text-white font-medium">
                          {referral.firstName} {referral.lastName}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {referral.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {referral.phone}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between p-4 border-t border-gray-700/50">
              <div className="text-sm text-gray-400">
                Showing {filteredReferrals.length} of {totalReferrals} referrals
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1 || isLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#4545456b] border border-gray-700/50 rounded-lg hover:bg-[#454545] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-sm font-medium text-white bg-[#BF9A68] rounded-lg">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || isLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#4545456b] border border-gray-700/50 rounded-lg hover:bg-[#454545] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealtorReferrals;
