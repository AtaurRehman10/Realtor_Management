import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, Mail, Phone, Calendar, DollarSign, Percent, Users, TrendingUp } from "lucide-react";
import { getRealtorById, getReferralsByRealtorId } from "../api/adminApi";

const ViewRealtor = () => {
     const { id } = useParams();
     const navigate = useNavigate();
     const [isLoading, setIsLoading] = useState(true);
     const [realtor, setRealtor] = useState(null);
     const [referrals, setReferrals] = useState([]);
     const [error, setError] = useState(null);

     useEffect(() => {
          const fetchData = async () => {
               try {
                    setIsLoading(true);

                    // Fetch realtor details
                    const realtorResponse = await getRealtorById(id);
                    const realtorData = realtorResponse.data || realtorResponse;
                    setRealtor(realtorData);

                    // Try to fetch referrals, but don't fail the whole page if it fails
                    try {
                         const referralsResponse = await getReferralsByRealtorId(id);
                         setReferrals(referralsResponse.data || referralsResponse || []);
                    } catch (refErr) {
                         console.warn("Failed to fetch referrals for realtor:", refErr);
                         setReferrals([]);
                    }
               } catch (err) {
                    console.error("Failed to fetch realtor data:", err);
                    setError(err.response?.data?.message || err.message || "Failed to load realtor details.");
               } finally {
                    setIsLoading(false);
               }
          }; // This closes the fetchData async function

          if (id) {
               fetchData();
          }
     }, [id]);

     if (isLoading) {
          return (
               <div className="flex items-center justify-center min-h-screen">
                    <Loader2 className="w-8 h-8 animate-spin text-[#BF9A68]" />
               </div>
          );
     }

     if (error || !realtor) {
          return (
               <div className="min-h-screen p-6 flex flex-col items-center justify-center text-white">
                    <p className="text-red-400 mb-4">{error || "Realtor not found"}</p>
                    <button
                         onClick={() => navigate("/admin/realtors")}
                         className="flex items-center gap-2 text-[#BF9A68] hover:text-[#8E653A] transition-colors"
                    >
                         <ArrowLeft className="w-4 h-4" />
                         Back to Realtors
                    </button>
               </div>
          );
     }

     return (
          <div className="relative min-h-screen p-6">
               <div className="absolute top-0 right-0 bg-[#BF9A68]/10 rounded-full blur-3xl pointer-events-none"></div>
               <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8E653A]/10 rounded-full blur-3xl pointer-events-none"></div>

               <div className=" relative z-10">
                    <button
                         onClick={() => navigate("/admin/realtors")}
                         className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
                    >
                         <ArrowLeft className="w-4 h-4" />
                         Back to Realtors
                    </button>

                    <div className="space-y-6">
                         {/* Header Section */}
                         <div className="bg-[#4545456b] backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 sm:p-8">
                              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                                   {/* Profile Image */}
                                   <div className="flex-shrink-0">
                                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-[#BF9A68]/20 bg-[#454545] flex items-center justify-center">
                                             {realtor.profile_image ? (
                                                  <img
                                                       src={realtor.profile_image}
                                                       alt={`${realtor.first_name} ${realtor.last_name}`}
                                                       className="w-full h-full object-cover"
                                                  />
                                             ) : (
                                                  <span className="text-2xl sm:text-3xl font-bold text-[#BF9A68]">
                                                       {realtor.first_name?.[0]?.toUpperCase()}
                                                  </span>
                                             )}
                                        </div>
                                   </div>

                                   <div className="flex-grow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
                                        <div>
                                             <h1 className="text-3xl font-bold text-white mb-2">
                                                  {realtor.first_name} {realtor.last_name}
                                             </h1>
                                             <div className="flex flex-wrap gap-4 text-gray-300">
                                                  <div className="flex items-center gap-2">
                                                       <Mail className="w-4 h-4 text-[#BF9A68]" />
                                                       {realtor.email}
                                                  </div>
                                                  {realtor.phone && (
                                                       <div className="flex items-center gap-2">
                                                            <Phone className="w-4 h-4 text-[#BF9A68]" />
                                                            {realtor.phone}
                                                       </div>
                                                  )}
                                             </div>
                                        </div>
                                        <div className={`px-4 py-2 rounded-full text-sm font-medium ${realtor.is_active
                                             ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                             : "bg-red-500/20 text-red-400 border border-red-500/30"
                                             }`}>
                                             {realtor.is_active ? "Active" : "Inactive"}
                                        </div>
                                   </div>
                              </div>
                         </div>

                         {/* Realtor Overview */}
                         <div className="bg-[#4545456b] backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 sm:p-8">
                              <h2 className="text-xl font-bold text-white mb-6 border-b border-gray-700/50 pb-4">
                                   Realtor Overview
                              </h2>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                   <div className="space-y-1">
                                        <p className="text-sm text-gray-400">Commission Rate</p>
                                        <p className="text-lg font-semibold text-white flex items-center gap-2">
                                             <Percent className="w-4 h-4 text-[#BF9A68]" />
                                             {realtor.commission_rate}%
                                        </p>
                                   </div>

                                   <div className="space-y-1">
                                        <p className="text-sm text-gray-400">Total Signups</p>
                                        <p className="text-lg font-semibold text-white flex items-center gap-2">
                                             <Users className="w-4 h-4 text-blue-400" />
                                             {referrals.length}
                                        </p>
                                   </div>

                                   <div className="space-y-1">
                                        <p className="text-sm text-gray-400">Total Commission</p>
                                        <p className="text-lg font-semibold text-green-400 flex items-center gap-2">
                                             <DollarSign className="w-4 h-4" />
                                             {parseFloat(realtor.total_commission_earned || 0).toLocaleString()}
                                        </p>
                                   </div>

                                   <div className="space-y-1">
                                        <p className="text-sm text-gray-400">Pending Commission</p>
                                        <p className="text-lg font-semibold text-yellow-400 flex items-center gap-2">
                                             <DollarSign className="w-4 h-4" />
                                             {parseFloat(realtor.pending_commission || 0).toLocaleString()}
                                        </p>
                                   </div>

                                   <div className="space-y-1">
                                        <p className="text-sm text-gray-400">Total Loan Amount</p>
                                        <p className="text-lg font-semibold text-blue-400 flex items-center gap-2">
                                             <TrendingUp className="w-4 h-4" />
                                             ${parseFloat(realtor.total_loan_amount_referred || 0).toLocaleString()}
                                        </p>
                                   </div>

                                   <div className="space-y-1">
                                        <p className="text-sm text-gray-400">Commission Paid</p>
                                        <p className="text-lg font-semibold text-white flex items-center gap-2">
                                             <DollarSign className="w-4 h-4 text-[#BF9A68]" />
                                             {/* Assuming commission paid is total earned for now, or 0 if not tracked separately */}
                                             ${parseFloat(realtor.commission_paid || 0).toLocaleString()}
                                        </p>
                                   </div>
                              </div>
                         </div>

                         {/* Associated Referrals */}
                         <div className="bg-[#4545456b] backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden">
                              <div className="p-6 sm:p-8 border-b border-gray-700/50">
                                   <h2 className="text-xl font-bold text-white">Associated Referrals</h2>
                              </div>

                              <div className="overflow-x-auto">
                                   <table className="w-full">
                                        <thead>
                                             <tr className="bg-[#45454598]">
                                                  <th className="px-6 py-4 text-left text-sm font-bold text-[#BF9A68] uppercase tracking-wide">Name</th>
                                                  <th className="px-6 py-4 text-left text-sm font-bold text-[#BF9A68] uppercase tracking-wide">Email</th>
                                                  <th className="px-6 py-4 text-left text-sm font-bold text-[#BF9A68] uppercase tracking-wide">Date</th>
                                                  <th className="px-6 py-4 text-left text-sm font-bold text-[#BF9A68] uppercase tracking-wide">Loan Amount</th>
                                                  <th className="px-6 py-4 text-left text-sm font-bold text-[#BF9A68] uppercase tracking-wide">Status</th>
                                             </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-700/50">
                                             {referrals.length === 0 ? (
                                                  <tr>
                                                       <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                                                            No referrals found for this realtor.
                                                       </td>
                                                  </tr>
                                             ) : (
                                                  referrals.map((referral, index) => (
                                                       <tr key={index} className="hover:bg-[#4545456b] transition-colors">
                                                            <td className="px-6 py-4 text-sm text-white font-medium">
                                                                 {referral.firstName} {referral.lastName}
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-300">
                                                                 {referral.email}
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-300">
                                                                 {new Date(referral.createdAt || Date.now()).toLocaleDateString()}
                                                            </td>
                                                            <td className="px-6 py-4 text-sm font-semibold text-blue-400">
                                                                 ${parseFloat(referral.loanAmount || 0).toLocaleString()}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${referral.status === 'closed' ? 'bg-green-500/20 text-green-400' :
                                                                      referral.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                                                           'bg-gray-500/20 text-gray-400'
                                                                      }`}>
                                                                      {referral.status || 'Pending'}
                                                                 </span>
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
          </div>
     );
};

export default ViewRealtor;
