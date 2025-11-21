// src/component/AdminRealtors.jsx
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Eye,
  Edit,
  Trash2,
  Loader2,
  PlusCircle,
  RefreshCw,
  Search,
  Filter,
  Download,
  Mail,
  DollarSign,
  Percent,
  TrendingUp,
  User,
} from "lucide-react";

import { getAdminRealtors, deleteRealtor } from "../api/adminApi";

const AdminRealtors = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [realtors, setRealtors] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRealtors, setTotalRealtors] = useState(0);
  const itemsPerPage = 10;

  const fetchRealtors = async () => {
    try {
      setIsLoading(true);
      const response = await getAdminRealtors(currentPage, itemsPerPage);
      if (response.success || response.data) { // Check for success or data presence
        // The API response structure in the screenshot shows "data" as the array and "total" as the count
        // But typically response.data from axios is the body.
        // Let's assume the response body is what we see in the screenshot.
        // Wait, my api wrapper returns response.data.
        // So response here IS the body.
        // Body has: total, page, pages, limit, data (array)
        setRealtors(response.data || []);
        setTotalPages(response.pages || 1);
        setTotalRealtors(response.total || 0);
      }
    } catch (err) {
      console.error("Failed to fetch realtors:", err);
      setError("Failed to load realtors. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRealtors();
  }, [currentPage]);

  // Filter realtors based on search term (Client-side filtering on current page data for now)
  const filteredRealtors = realtors.filter((realtor) => {
    if (searchTerm.trim() === "") return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      realtor.first_name?.toLowerCase().includes(searchLower) ||
      realtor.last_name?.toLowerCase().includes(searchLower) ||
      realtor.email?.toLowerCase().includes(searchLower)
    );
  });

  const handleView = (realtor) => {
    navigate(`/admin/realtors/view/${realtor._id || realtor.id}`);
  };

  const handleEdit = (realtor) => {
    navigate(`/admin/realtors/edit/${realtor._id || realtor.id}`);
  };

  const handleDelete = async (realtor) => {
    try {
      setIsDeleting(true);
      await deleteRealtor(realtor._id);
      setRealtors((prev) => prev.filter((r) => r._id !== realtor._id));
      setTotalRealtors((prev) => prev - 1);
      toast.success(`${realtor.first_name} ${realtor.last_name} deleted successfully!`);
    } catch (err) {
      console.error("Failed to delete realtor:", err);
      toast.error("Failed to delete realtor. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAddRealtor = () => {
    console.log("Add new realtor");
  };

  const handleExport = () => {
    console.log("Exporting realtors...");
  };

  // Calculate totals (for current page)
  const totalLoanAmount = realtors.reduce(
    (sum, r) => sum + parseFloat(r.total_loan_amount_referred || 0),
    0
  );
  const totalCommissions = realtors.reduce(
    (sum, r) => sum + parseFloat(r.total_commission_earned || 0),
    0
  );
  const totalPending = realtors.reduce(
    (sum, r) => sum + parseFloat(r.pending_commission || 0),
    0
  );

  return (
    <div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#BF9A68]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8E653A]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative space-y-6 sm:space-y-8">
        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <div className="bg-[#4545456b] backdrop-blur-xl rounded-xl p-5 border border-gray-700/50 hover:border-[#8E653A]/50 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-[#8E653A] to-[#BF9A68] p-3 rounded-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">
                  Total Realtors
                </p>
                <p className="text-2xl font-bold text-white">
                  {totalRealtors}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#4545456b] backdrop-blur-xl rounded-xl p-5 border border-gray-700/50 hover:border-[#8E653A]/50 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Total Loans</p>
                <p className="text-2xl font-bold text-white">
                  ${totalLoanAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#4545456b] backdrop-blur-xl rounded-xl p-5 border border-gray-700/50 hover:border-[#8E653A]/50 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">
                  Total Commission
                </p>
                <p className="text-2xl font-bold text-white">
                  ${totalCommissions.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#4545456b] backdrop-blur-xl rounded-xl p-5 border border-gray-700/50 hover:border-[#8E653A]/50 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-3 rounded-lg">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Pending</p>
                <p className="text-2xl font-bold text-white">
                  ${totalPending.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 sm:h-14 pl-12 pr-4 bg-[#4545456b] backdrop-blur-xl border-2 border-gray-700/50 rounded-xl text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#8E653A]/50 focus:border-[#BF9A68] transition-all duration-200 hover:border-gray-600/50"
            />
          </div>


        </div>

        {/* Realtors Table */}
        <div className="bg-[#4545456b] backdrop-blur-xl rounded-2xl shadow-lg border border-gray-700/50 overflow-hidden">
          <div className="p-5 sm:p-7 border-b border-gray-700/50 bg-[#45454598]">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-[#8E653A] to-[#BF9A68] p-2 rounded-lg">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  All Realtors
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                  {filteredRealtors.length}{" "}
                  {filteredRealtors.length === 1 ? "realtor" : "realtors"} found
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="block xl:hidden">
            {isLoading ? (
              <div className="px-4 py-16 text-center">
                <div className="flex justify-center items-center gap-2 text-gray-400">
                  <Loader2 className="w-6 h-6 animate-spin text-[#BF9A68]" />
                  <span>Loading realtors...</span>
                </div>
              </div>
            ) : error ? (
              <div className="px-4 py-16 text-center">
                <div className="text-red-400">
                  <p className="mb-3">{error}</p>
                  <button
                    onClick={fetchRealtors}
                    className="inline-flex items-center gap-2 text-sm text-[#BF9A68] hover:text-[#8E653A] transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                  </button>
                </div>
              </div>
            ) : filteredRealtors.length === 0 ? (
              <div className="px-4 py-16 text-center">
                <Users className="w-16 h-16 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-300 font-medium">
                  {searchTerm
                    ? "No matching realtors found"
                    : "No realtors found"}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {searchTerm
                    ? "Try adjusting your search"
                    : "Add your first realtor to get started"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-700/50">
                {filteredRealtors.map((realtor) => (
                  <div
                    key={realtor._id}
                    className="p-4 sm:p-5 hover:bg-gray-700/30 transition-colors"
                  >
                    <div className="space-y-3">
                      {/* Header with Actions */}
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-[#454545] flex-shrink-0 flex items-center justify-center border border-gray-600">
                            {realtor.profile_image ? (
                              <img
                                src={realtor.profile_image}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-[#BF9A68] font-bold text-xs">
                                {realtor.first_name?.[0]?.toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-white">
                              {realtor.first_name} {realtor.last_name}
                            </h3>
                            <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                              <Mail className="w-3 h-3" />
                              {realtor.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleView(realtor)}
                            className="p-2 text-gray-400 hover:text-[#BF9A68] hover:bg-gray-700/50 rounded-lg transition-all"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(realtor)}
                            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700/50 rounded-lg transition-all"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(realtor)}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700/50 rounded-lg transition-all"
                            disabled={isDeleting}
                          >
                            {isDeleting ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="bg-gray-700/30 rounded-lg p-3">
                          <p className="text-xs text-gray-400 mb-1">
                            Loan Amount
                          </p>
                          <p className="text-sm font-semibold text-blue-400">
                            ${parseFloat(realtor.total_loan_amount_referred || 0).toLocaleString()}
                          </p>
                        </div>
                        <div className="bg-gray-700/30 rounded-lg p-3">
                          <p className="text-xs text-gray-400 mb-1">
                            Commission Rate
                          </p>
                          <p className="text-sm font-semibold text-white">
                            {realtor.commission_rate}%
                          </p>
                        </div>
                        <div className="bg-gray-700/30 rounded-lg p-3">
                          <p className="text-xs text-gray-400 mb-1">
                            Total Commission
                          </p>
                          <p className="text-sm font-semibold text-green-400">
                            $
                            {parseFloat(
                              realtor.total_commission_earned || 0
                            ).toLocaleString()}
                          </p>
                        </div>
                        <div className="bg-gray-700/30 rounded-lg p-3">
                          <p className="text-xs text-gray-400 mb-1">Pending</p>
                          <p className="text-sm font-semibold text-yellow-400">
                            $
                            {parseFloat(
                              realtor.pending_commission || 0
                            ).toLocaleString()}
                          </p>
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
                      <DollarSign className="w-4 h-4" />
                      Loan Amount
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#BF9A68] uppercase tracking-wide">
                    <div className="flex items-center gap-2">
                      <Percent className="w-4 h-4" />
                      Rate
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#BF9A68] uppercase tracking-wide">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Total Commission
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#BF9A68] uppercase tracking-wide">
                    Pending
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-[#BF9A68] uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-16 text-center">
                      <div className="flex justify-center items-center gap-2 text-gray-400">
                        <Loader2 className="w-6 h-6 animate-spin text-[#BF9A68]" />
                        <span>Loading realtors...</span>
                      </div>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-16 text-center">
                      <div className="text-red-400">
                        <p className="mb-3">{error}</p>
                        <button
                          onClick={fetchRealtors}
                          className="inline-flex items-center gap-2 text-sm text-[#BF9A68] hover:text-[#8E653A] transition-colors"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Try Again
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : filteredRealtors.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-16 text-center">
                      <Users className="w-16 h-16 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-300 font-medium">
                        {searchTerm
                          ? "No matching realtors found"
                          : "No realtors found"}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {searchTerm
                          ? "Try adjusting your search"
                          : "Add your first realtor to get started"}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredRealtors.map((realtor) => (
                    <tr
                      key={realtor._id}
                      className="border-t border-gray-700/50 hover:bg-[#4545456b] transition-colors duration-200"
                    >
                      <td className="px-6 py-4 text-sm text-white font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-[#454545] flex-shrink-0 flex items-center justify-center border border-gray-600">
                            {realtor.profile_image ? (
                              <img
                                src={realtor.profile_image}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-[#BF9A68] font-bold text-xs">
                                {realtor.first_name?.[0]?.toUpperCase()}
                              </span>
                            )}
                          </div>
                          <span>
                            {realtor.first_name} {realtor.last_name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {realtor.email}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-blue-400">
                        ${parseFloat(realtor.total_loan_amount_referred || 0).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {realtor.commission_rate}%
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-green-400">
                        ${parseFloat(realtor.total_commission_earned || 0).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-yellow-400">
                        $
                        {parseFloat(realtor.pending_commission || 0).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleView(realtor)}
                            className="p-2 text-gray-400 hover:text-[#BF9A68] hover:bg-gray-700/50 rounded-lg transition-all"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(realtor)}
                            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700/50 rounded-lg transition-all"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(realtor)}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700/50 rounded-lg transition-all"
                            disabled={isDeleting}
                            title="Delete"
                          >
                            {isDeleting ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
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
              Showing {filteredRealtors.length} of {totalRealtors} realtors
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

export default AdminRealtors;
