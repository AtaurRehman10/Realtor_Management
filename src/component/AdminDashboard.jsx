// src/component/AdminDashboard.jsx
import { getAdminStats, getAdminReferrals } from "../api/adminApi";
import { useState, useEffect } from "react";
import {
  Users,
  UserPlus,
  DollarSign,
  Clock,
  CheckCircle,
  Building,
  FileText,
  TrendingUp,
} from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentReferrals, setRecentReferrals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, referralsRes] = await Promise.all([
          getAdminStats(),
          getAdminReferrals(1, 5),
        ]);

        if (statsRes.success) {
          setStats(statsRes.data);
        }
        if (referralsRes.success) {
          setRecentReferrals(referralsRes.data);
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  // Stats data for the dashboard cards
  const statsData = [
    {
      title: "Total Affiliates",
      value: stats?.totalAffiliates || 0,
      icon: Users,
      gradient: "from-purple-500 to-purple-600",
    },
    {
      title: "Total Loans",
      value: stats?.totalLoans || 0,
      icon: FileText,
      gradient: "from-cyan-500 to-cyan-600",
    },
    {
      title: "Total Amount",
      value: formatCurrency(stats?.totalAmount),
      icon: DollarSign,
      gradient: "from-blue-500 to-blue-600",
      highlight: true,
    },
    {
      title: "Approved Amount",
      value: formatCurrency(stats?.Approved?.amount),
      icon: CheckCircle,
      gradient: "from-green-500 to-green-600",
      highlight: true,
    },
    {
      title: "Funded Amount",
      value: formatCurrency(stats?.Funded?.amount),
      icon: Building,
      gradient: "from-emerald-500 to-emerald-600",
      highlight: true,
    },
    {
      title: "Pending Amount",
      value: formatCurrency(stats?.Pending?.amount),
      icon: Clock,
      gradient: "from-yellow-500 to-yellow-600",
      highlight: true,
    },
  ];

  return (
    <div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#BF9A68]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8E653A]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative space-y-6 sm:space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-[#4545456b]  backdrop-blur-xl rounded-2xl p-5 sm:p-6 shadow-lg border border-gray-700/50  transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm font-medium text-gray-400 mb-2 group-hover:text-gray-300 transition-colors">
                      {stat.title}
                    </div>
                    <div
                      className={`"text-2xl sm:text-3xl font-bold ${stat.highlight
                        ? "bg-[#BF9A68] bg-clip-text text-transparent"
                        : "text-white"
                        } `}
                    >
                      {stat.value}
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-[#8E653A] to-[#BF9A68] p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>

                {/* Optional trend indicator */}
                {stat.highlight && (
                  <div className="flex items-center gap-1 text-xs text-green-400">
                    <TrendingUp className="w-3 h-3" />
                    <span className="font-medium">Active</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Referrals Table */}
        <div className="bg-[#4545456b]  backdrop-blur-xl rounded-2xl shadow-lg border border-gray-700/50 overflow-hidden">
          <div className="p-5 sm:p-7 border-b border-gray-700/50 bg-[#4545456b] ">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-[#8E653A] to-[#BF9A68] p-2 rounded-lg">
                <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Recent Referrals
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                  Latest 5 affiliate referrals
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="block lg:hidden">
            {recentReferrals.length === 0 ? (
              <div className="px-4 py-16 text-center">
                <UserPlus className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 text-sm font-medium">
                  No referrals yet
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Referrals will appear here once affiliates start sharing
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-700/50">
                {recentReferrals.map((referral, index) => (
                  <div
                    key={index}
                    className="p-4 sm:p-5 space-y-3 hover:bg-[#4545456b] transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-semibold text-[#BF9A68] uppercase tracking-wide">
                        Name
                      </span>
                      <span className="text-sm text-white font-medium">
                        {referral.firstName} {referral.lastName}
                      </span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-semibold text-[#BF9A68] uppercase tracking-wide">
                        Email
                      </span>
                      <span className="text-sm text-gray-300 truncate ml-2 text-right">
                        {referral.email}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-[#BF9A68] uppercase tracking-wide">
                        Phone
                      </span>
                      <span className="text-sm text-gray-300">
                        {referral.phone}
                      </span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-semibold text-[#BF9A68] uppercase tracking-wide">
                        Realtor
                      </span>
                      <span className="text-sm text-gray-300 truncate ml-2 text-right">
                        {referral.affiliate_id?.email || "N/A"}
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
                <tr className="bg-[#454545a6]">
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#BF9A68] uppercase tracking-wide">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#BF9A68] uppercase tracking-wide">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#BF9A68] uppercase tracking-wide">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#BF9A68] uppercase tracking-wide">
                    Realtor
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentReferrals.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-16 text-center">
                      <UserPlus className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-400 text-sm font-medium">
                        No referrals yet
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        Referrals will appear here once affiliates start sharing
                      </p>
                    </td>
                  </tr>
                ) : (
                  recentReferrals.map((referral, index) => (
                    <tr
                      key={index}
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
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
