// src/component/AdminReferrals.jsx
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  UserPlus,
  Eye,
  Edit,
  Trash2,
  Loader2,
  Search,
  Download,
  RefreshCw,
  Users,
  Mail,
  Phone,
  User,
} from "lucide-react";

import { getAdminReferrals } from "../api/adminApi";

const AdminReferrals = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalReferrals, setTotalReferrals] = useState(0);
  const itemsPerPage = 10;

  const fetchReferrals = async () => {
    try {
      setIsLoading(true);
      const response = await getAdminReferrals(currentPage, itemsPerPage);
      if (response.success) {
        setReferrals(response.data);
        setTotalPages(response.totalPages);
        setTotalReferrals(response.totalReferrals);
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

  // Filter referrals based on search term (Client-side filtering on current page data for now)
  const filteredReferrals = referrals.filter((referral) => {
    if (searchTerm.trim() === "") return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      referral.firstName?.toLowerCase().includes(searchLower) ||
      referral.lastName?.toLowerCase().includes(searchLower) ||
      referral.email?.toLowerCase().includes(searchLower) ||
      referral.phone?.toLowerCase().includes(searchLower) ||
      referral.affiliate_id?.email?.toLowerCase().includes(searchLower)
    );
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleView = (referral) => {
    console.log("View referral:", referral);
  };

  const handleEdit = (referral) => {
    console.log("Edit referral:", referral);
  };

  const handleDelete = async (referral) => {
    try {
      setIsDeleting(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setReferrals((prev) => prev.filter((r) => r.id !== referral.id));
      toast.success(`Referral deleted successfully!`);
    } catch (err) {
      console.error("Failed to delete referral:", err);
      toast.error("Failed to delete referral. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExport = () => {
    console.log("Exporting referrals...");
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#BF9A68]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8E653A]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative space-y-6 sm:space-y-8">
        {/* Stats Summary */}
        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="bg-[#4545456b] backdrop-blur-xl rounded-xl p-5 border border-gray-700/50 hover:border-[#8E653A]/50 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-[#8E653A] to-[#BF9A68] p-3 rounded-lg">
                <UserPlus className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">
                  Total Referrals
                </p>
                <p className="text-2xl font-bold text-white">
                  {totalReferrals}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#4545456b] backdrop-blur-xl rounded-xl p-5 border border-gray-700/50 hover:border-[#8E653A]/50 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg">
                <Search className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">
                  Filtered Results
                </p>
                <p className="text-2xl font-bold text-white">
                  {filteredReferrals.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
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

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              className="flex items-center justify-center gap-2 bg-[#4545456b] backdrop-blur-xl border-2 border-gray-700/50 hover:border-[#8E653A]/50 text-gray-300 hover:text-white font-medium px-4 sm:px-6 h-12 sm:h-14 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#8E653A]/20 text-sm sm:text-base whitespace-nowrap"
            >
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Referrals Table */}
        <div className="bg-[#4545456b] backdrop-blur-xl rounded-2xl shadow-lg border border-gray-700/50 overflow-hidden">
          <div className="p-5 sm:p-7 border-b border-gray-700/50 bg-[#45454555]">
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
          <div className="block xl:hidden">
            {isLoading ? (
              <div className="px-4 py-16 text-center">
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <Loader2 className="w-8 h-8 mb-4 animate-spin text-[#BF9A68]" />
                  <p>Loading referrals...</p>
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
                <UserPlus className="w-16 h-16 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-300 font-medium">
                  {searchTerm
                    ? "No matching referrals found"
                    : "No referrals found"}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {searchTerm
                    ? "Try adjusting your search"
                    : "Referrals will appear here once realtors start sharing their affiliate links"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-700/50">
                {filteredReferrals.map((referral) => (
                  <div
                    key={referral.id}
                    className="p-4 sm:p-5 hover:bg-gray-700/30 transition-colors"
                  >
                    <div className="space-y-3">
                      {/* Header */}
                      <div>
                        <h3 className="text-base font-semibold text-white flex items-center gap-2">
                          {referral.firstName} {referral.lastName}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(referral.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Details */}
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Mail className="w-4 h-4 text-[#BF9A68]" />
                          {referral.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Phone className="w-4 h-4 text-[#BF9A68]" />
                          {referral.phone}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <User className="w-4 h-4 text-[#BF9A68]" />
                          <span className="text-gray-400">Realtor:</span>{" "}
                          {referral.affiliate_id?.email || "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden xl:block overflow-x-auto">
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
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#BF9A68] uppercase tracking-wide">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Realtor
                    </div>
                  </th>

                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <Loader2 className="w-8 h-8 mb-4 animate-spin text-[#BF9A68]" />
                        <p>Loading referrals...</p>
                      </div>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-16 text-center">
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
                    <td colSpan="5" className="px-6 py-16 text-center">
                      <UserPlus className="w-16 h-16 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-300 font-medium">
                        {searchTerm
                          ? "No matching referrals found"
                          : "No referrals found"}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {searchTerm
                          ? "Try adjusting your search"
                          : "Referrals will appear here once realtors start sharing their affiliate links"}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredReferrals.map((referral) => (
                    <tr
                      key={referral.id}
                      className="border-t border-gray-700/50 hover:bg-gray-700/30 transition-colors duration-200"
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
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {referral.affiliate_id?.email || "N/A"}
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
  );
};

export default AdminReferrals;
