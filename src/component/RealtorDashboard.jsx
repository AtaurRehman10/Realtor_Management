import { useState, useEffect } from "react";
import {
  Users,
  MousePointer,
  UserPlus,
  DollarSign,
  Clock,
  CheckCircle,
  Building,
  RefreshCw,
  TrendingUp,
  Copy,
  CheckCheck,
} from "lucide-react";
import { getRealtorProfile, getRealtorReferrals } from "../api/realtorApi";

const Dashboard = () => {
  const [affiliateLink, setAffiliateLink] = useState(
    "https://example.com/affiliate/your-link-here"
  );
  const [copied, setCopied] = useState(false);
  const [recentReferrals, setRecentReferrals] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, referralsData] = await Promise.all([
          getRealtorProfile(),
          getRealtorReferrals(1, 5) // Fetch first page, limit 5 for recent
        ]);

        if (profileData) {
          setStats(profileData);
          if (profileData.unique_affiliate_link) {
            setAffiliateLink(profileData.unique_affiliate_link);
          }
        }

        if (referralsData && referralsData.data) {
          setRecentReferrals(referralsData.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  const statsData = [
    {
      title: "Total clicks",
      value: stats?.total_clicks || 0,
      icon: MousePointer,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Total Calls Booked",
      value: stats?.total_calls_booked || 0,
      icon: UserPlus,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Total Commission Earned",
      value: formatCurrency(stats?.total_commission_earned),
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Pending Commission",
      value: formatCurrency(stats?.pending_commission),
      icon: Clock,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      title: "Commission Paid",
      value: formatCurrency(stats?.commission_paid_to_date),
      icon: DollarSign,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Pending Loan Amount",
      value: formatCurrency(stats?.pending_loan_amount),
      icon: Clock,
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Approved Loan Amount",
      value: formatCurrency(stats?.approved_loan_amount),
      icon: CheckCircle,
      color: "from-teal-500 to-teal-600",
    },
    {
      title: "Funded Loan Amount",
      value: formatCurrency(stats?.funded_loan_amount),
      icon: Building,
      color: "from-indigo-500 to-indigo-600",
    },
    {
      title: "Total Refund Amount",
      value: formatCurrency(0),
      icon: RefreshCw,
      color: "from-pink-500 to-pink-600",
    },
    {
      title: "Total Refunds",
      value: "0",
      icon: RefreshCw,
      color: "from-rose-500 to-rose-600",
    },
  ];

  return (
    <div>
      {/* Background Effects */}
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

      <div className="absolute top-0 right-0 w-96 h-96 bg-[#BF9A68]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8E653A]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative space-y-6 sm:space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="group relative  bg-[#4545456b] backdrop-blur-xl rounded-2xl p-5 sm:p-6 shadow-lg border border-gray-700/50  transition-all duration-300  hover:-translate-y-1"
            >
              <div className="relative flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-xs sm:text-sm font-medium text-gray-400 mb-2 break-words group-hover:text-gray-300 transition-colors">
                    {stat.title}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white truncate">
                    {stat.value}
                  </div>
                </div>
                <div className="bg-gradient-to-r from-[#8E653A] to-[#BF9A68] p-3 rounded-xl flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Affiliate Link */}
        <div className="bg-[#4545456b] backdrop-blur-xl rounded-2xl p-5 sm:p-7 shadow-lg border border-gray-700/50">
          <div className="flex items-center gap-2 mb-4 sm:mb-5">
            <div className="bg-gradient-to-r from-[#8E653A] to-[#BF9A68] p-2 rounded-lg">
              <Copy className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Your Affiliate Link
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1 group">
              <input
                type="text"
                value={affiliateLink}
                readOnly
                className="w-full h-12 sm:h-14 px-4 sm:px-5 bg-gray-700/50 border-2 border-gray-600/50 rounded-xl text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#8E653A]/50 focus:border-[#BF9A68] transition-all duration-200 hover:border-gray-500/50 pr-4"
              />
            </div>
            <button
              onClick={handleCopy}
              className={`flex items-center justify-center gap-2 font-semibold px-6 sm:px-8 h-12 sm:h-14 rounded-xl transition-all duration-300 shadow-lg whitespace-nowrap text-sm sm:text-base ${copied
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gradient-to-r from-[#8E653A] to-[#BF9A68] hover:from-[#BF9A68] hover:to-[#8E653A] hover:shadow-xl hover:shadow-[#8E653A]/30"
                } text-white`}
            >
              {copied ? (
                <>
                  <CheckCheck className="w-5 h-5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                  Copy Link
                </>
              )}
            </button>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-gray-400">
            Share this link with potential referrals to track your commissions
          </p>
        </div>

        {/* Recent Referrals */}
        <div className="bg-[#4545456b] backdrop-blur-xl rounded-2xl shadow-lg border border-gray-700/50 overflow-hidden">
          <div className="p-5 sm:p-7 border-b border-gray-700/50 bg-[#4545456b]">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-[#8E653A] to-[#BF9A68] p-2 rounded-lg">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Recent Referrals
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                  View your latest referral activity
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="block sm:hidden">
            {recentReferrals.length === 0 ? (
              <div className="px-4 py-16 text-center">
                <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 text-sm font-medium">
                  No referrals yet
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Start sharing your affiliate link to see referrals here
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[#4545456b]">
                {recentReferrals.map((referral, index) => (
                  <div
                    key={index}
                    className="p-4 space-y-3 hover:bg-[#4545456b] transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-[#BF9A68] uppercase tracking-wide">
                        Name
                      </span>
                      <span className="text-sm text-white font-medium">
                        {referral.firstName} {referral.lastName}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-[#BF9A68] uppercase tracking-wide">
                        Email
                      </span>
                      <span className="text-sm text-gray-300 truncate ml-2">
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
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
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
                </tr>
              </thead>
              <tbody>
                {recentReferrals.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-16 text-center">
                      <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-400 text-sm font-medium">
                        No referrals yet
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        Start sharing your affiliate link to see referrals here
                      </p>
                    </td>
                  </tr>
                ) : (
                  recentReferrals.map((referral, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-700/50 hover:bg-[#45454580] transition-colors duration-200"
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
