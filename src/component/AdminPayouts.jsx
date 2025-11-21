// src/component/AdminPayouts.jsx
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  DollarSign,
  Loader2,
  RefreshCw,
  Search,
  Download,
  CheckCircle,
  Clock,
  XCircle,
  Filter,
  Calendar,
  Mail,
  User,
  TrendingUp,
} from "lucide-react";

const AdminPayouts = () => {
  const [payouts, setPayouts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPayouts, setFilteredPayouts] = useState([]);

  const fetchPayouts = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Enhanced mock data
      const mockData = [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          realtor: "Marc",
          referralDate: "2024-01-15",
          loanAmount: "250000",
          commission: "25000",
          status: "Paid",
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          realtor: "Yazan",
          referralDate: "2024-01-20",
          loanAmount: "350000",
          commission: "35000",
          status: "Pending",
        },
        {
          id: 3,
          name: "Mike Wilson",
          email: "mike.w@example.com",
          realtor: "Marc",
          referralDate: "2024-02-01",
          loanAmount: "180000",
          commission: "18000",
          status: "Paid",
        },
        {
          id: 4,
          name: "Sarah Johnson",
          email: "sarah.j@example.com",
          realtor: "Test User",
          referralDate: "2024-02-10",
          loanAmount: "420000",
          commission: "42000",
          status: "Pending",
        },
        {
          id: 5,
          name: "David Brown",
          email: "david.b@example.com",
          realtor: "Yazan",
          referralDate: "2024-02-15",
          loanAmount: "295000",
          commission: "29500",
          status: "Failed",
        },
      ];

      setPayouts(mockData);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch payouts:", err);
      setError("Failed to load payouts. Please try again.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPayouts();
  }, []);

  useEffect(() => {
    let filtered = payouts;

    // Apply status filter
    if (filter !== "all") {
      filtered = filtered.filter(
        (p) => p.status.toLowerCase() === filter.toLowerCase()
      );
    }

    // Apply search filter
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (p) =>
          p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.realtor?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPayouts(filtered);
  }, [filter, searchTerm, payouts]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchPayouts();
  };

  const handleStatusUpdate = async (payoutId, newStatus) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      setPayouts((prev) =>
        prev.map((payout) =>
          payout.id === payoutId ? { ...payout, status: newStatus } : payout
        )
      );
    } catch (err) {
      console.error("Failed to update payout status:", err);
      toast.error("Failed to update payout status. Please try again.");
    }
  };

  const handleExport = () => {
    console.log("Exporting payouts...");
  };

  // Calculate statistics
  const totalPayouts = payouts.length;
  const paidCount = payouts.filter((p) => p.status === "Paid").length;
  const pendingCount = payouts.filter((p) => p.status === "Pending").length;
  const failedCount = payouts.filter((p) => p.status === "Failed").length;
  const totalAmount = payouts.reduce(
    (sum, p) => sum + parseFloat(p.commission || 0),
    0
  );
  const paidAmount = payouts
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => sum + parseFloat(p.commission || 0), 0);

  return (
    <div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#BF9A68]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8E653A]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative space-y-6 sm:space-y-8">
        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          <div className="bg-[#4545456b] backdrop-blur-xl rounded-xl p-5 border border-gray-700/50 hover:border-[#8E653A]/50 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-[#8E653A] to-[#BF9A68] p-3 rounded-lg">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">
                  Total Payouts
                </p>
                <p className="text-2xl font-bold text-white">{totalPayouts}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#4545456b] backdrop-blur-xl rounded-xl p-5 border border-gray-700/50 hover:border-green-500/50 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-lg">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Paid</p>
                <p className="text-2xl font-bold text-white">{paidCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#4545456b] backdrop-blur-xl rounded-xl p-5 border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-3 rounded-lg">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Pending</p>
                <p className="text-2xl font-bold text-white">{pendingCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#4545456b] backdrop-blur-xl rounded-xl p-5 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-3 rounded-lg">
                <XCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Failed</p>
                <p className="text-2xl font-bold text-white">{failedCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#4545456b] backdrop-blur-xl rounded-xl p-5 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Total Paid</p>
                <p className="text-xl font-bold text-white">
                  ${paidAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or realtor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 sm:h-14 pl-12 pr-4 bg-[#4545456b] backdrop-blur-xl border-2 border-gray-700/50 rounded-xl text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#8E653A]/50 focus:border-[#BF9A68] transition-all duration-200 hover:border-gray-600/50"
            />
          </div>

          {/* Filter and Actions */}
          <div className="flex gap-3">
            <div className="relative flex-1 lg:flex-none lg:w-40">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="
    w-full h-12 sm:h-14 pl-10 pr-4
    bg-[#4545456b] 
    backdrop-blur-xl 
    border-2 border-gray-700/50 
    rounded-xl text-white 
    text-sm sm:text-base 
    focus:outline-none 
    focus:ring-2 focus:ring-[#8E653A]/50 
    focus:border-[#BF9A68] 
    transition-all duration-200 
    hover:border-gray-600/50 
    appearance-none cursor-pointer
    [&>option]:bg-[#1a1a1acc] 
    [&>option]:text-white
  "
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center justify-center gap-2 bg-[#4545456b] backdrop-blur-xl border-2 border-gray-700/50 hover:border-[#8E653A]/50 text-gray-300 hover:text-white font-medium px-4 h-12 sm:h-14 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#8E653A]/20 whitespace-nowrap"
            >
              <RefreshCw
                className={`w-4 h-4 sm:w-5 sm:h-5 ${isRefreshing ? "animate-spin" : ""
                  }`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Payouts Table */}
        <div className="bg-[#4545456b] backdrop-blur-xl rounded-2xl shadow-lg border border-gray-700/50 overflow-hidden">
          <div className="p-5 sm:p-7 border-b border-gray-700/50 bg-[#45454555]">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-[#8E653A] to-[#BF9A68] p-2 rounded-lg">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  All Payouts
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                  {filteredPayouts.length}{" "}
                  {filteredPayouts.length === 1 ? "payout" : "payouts"} found
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
                  <p className="text-sm">Loading payouts...</p>
                </div>
              </div>
            ) : error ? (
              <div className="px-4 py-16 text-center">
                <div className="text-red-400">
                  <p className="text-sm mb-3">{error}</p>
                  <button
                    onClick={handleRefresh}
                    className="inline-flex items-center gap-2 text-sm text-[#BF9A68] hover:text-[#8E653A] transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                  </button>
                </div>
              </div>
            ) : filteredPayouts.length === 0 ? (
              <div className="px-4 py-16 text-center">
                <DollarSign className="w-16 h-16 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-300 font-medium">No payouts found</p>
                <p className="text-sm text-gray-500 mt-1">
                  {searchTerm || filter !== "all"
                    ? "Try adjusting your filters"
                    : "Payouts will appear here once processed"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-700/50">
                {filteredPayouts.map((payout) => (
                  <div
                    key={payout.id}
                    className="p-4 sm:p-5 hover:bg-gray-700/30 transition-colors"
                  >
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-base font-semibold text-white">
                            {payout.name}
                          </h3>
                          <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                            <Mail className="w-3 h-3" />
                            {payout.email}
                          </p>
                        </div>
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${payout.status === "Paid"
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : payout.status === "Pending"
                                ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                : "bg-red-500/20 text-red-400 border border-red-500/30"
                            }`}
                        >
                          {payout.status}
                        </span>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="bg-gray-700/30 rounded-lg p-3">
                          <p className="text-xs text-gray-400 mb-1">Realtor</p>
                          <p className="text-sm font-medium text-white">
                            {payout.realtor}
                          </p>
                        </div>
                        <div className="bg-gray-700/30 rounded-lg p-3">
                          <p className="text-xs text-gray-400 mb-1">Date</p>
                          <p className="text-sm font-medium text-white">
                            {new Date(payout.referralDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="bg-gray-700/30 rounded-lg p-3">
                          <p className="text-xs text-gray-400 mb-1">
                            Loan Amount
                          </p>
                          <p className="text-sm font-semibold text-white">
                            ${parseFloat(payout.loanAmount).toLocaleString()}
                          </p>
                        </div>
                        <div className="bg-gray-700/30 rounded-lg p-3">
                          <p className="text-xs text-gray-400 mb-1">
                            Commission
                          </p>
                          <p className="text-sm font-semibold text-green-400">
                            ${parseFloat(payout.commission).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Action Button */}
                      {payout.status === "Pending" && (
                        <button
                          onClick={() => handleStatusUpdate(payout.id, "Paid")}
                          className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-medium py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Mark as Paid
                        </button>
                      )}
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
                      <User className="w-4 h-4" />
                      Realtor
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#BF9A68] uppercase tracking-wide">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Date
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#BF9A68] uppercase tracking-wide">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Loan
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#BF9A68] uppercase tracking-wide">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Commission
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-[#BF9A68] uppercase tracking-wide">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <Loader2 className="w-8 h-8 mb-4 animate-spin text-[#BF9A68]" />
                        <p>Loading payouts...</p>
                      </div>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-16 text-center">
                      <div className="text-red-400">
                        <p className="mb-3">{error}</p>
                        <button
                          onClick={handleRefresh}
                          className="inline-flex items-center gap-2 text-sm text-[#BF9A68] hover:text-[#8E653A] transition-colors"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Try Again
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : filteredPayouts.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-16 text-center">
                      <DollarSign className="w-16 h-16 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-300 font-medium">
                        No payouts found
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {searchTerm || filter !== "all"
                          ? "Try adjusting your filters"
                          : "Payouts will appear here once processed"}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredPayouts.map((payout) => (
                    <tr
                      key={payout.id}
                      className="border-t border-gray-700/50 hover:bg-gray-700/30 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 text-sm text-white font-medium">
                        {payout.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {payout.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {payout.realtor}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {new Date(payout.referralDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-white">
                        ${parseFloat(payout.loanAmount).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-green-400">
                        ${parseFloat(payout.commission).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold min-w-[80px] text-center ${payout.status === "Paid"
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : payout.status === "Pending"
                                  ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                  : "bg-red-500/20 text-red-400 border border-red-500/30"
                              }`}
                          >
                            {payout.status}
                          </span>
                          {payout.status === "Pending" && (
                            <button
                              onClick={() =>
                                handleStatusUpdate(payout.id, "Paid")
                              }
                              className="p-2 text-gray-400 hover:text-green-400 hover:bg-gray-700/50 rounded-lg transition-all"
                              title="Mark as Paid"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPayouts;
