import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import { getRealtorById, updateRealtor } from "../api/adminApi";

const EditRealtor = () => {
     const { id } = useParams();
     const navigate = useNavigate();
     const [isLoading, setIsLoading] = useState(true);
     const [isSaving, setIsSaving] = useState(false);
     const [error, setError] = useState(null);

     const [formData, setFormData] = useState({
          first_name: "",
          last_name: "",
          email: "",
          commission_rate: 0,
          phone: "",
          address: "",
          notes: "",
          is_active: true,
          unique_affiliate_link: "",
          calendarName: ""
     });

     useEffect(() => {
          const fetchRealtor = async () => {
               try {
                    setIsLoading(true);
                    const response = await getRealtorById(id);
                    const data = response.data || response;
                    if (data) {
                         setFormData({
                              first_name: data.first_name || "",
                              last_name: data.last_name || "",
                              email: data.email || "",
                              commission_rate: data.commission_rate || 0,
                              phone: data.phone || "",
                              address: data.address || "",
                              notes: data.notes || "",
                              is_active: data.is_active ?? true,
                              unique_affiliate_link: data.unique_affiliate_link || "",
                              calendarName: data.calendarName || ""
                         });
                    }
               } catch (err) {
                    console.error("Failed to fetch realtor:", err);
                    setError("Failed to load realtor details.");
               } finally {
                    setIsLoading(false);
               }
          };

          if (id) {
               fetchRealtor();
          }
     }, [id]);

     const handleChange = (e) => {
          const { name, value, type, checked } = e.target;
          setFormData(prev => ({
               ...prev,
               [name]: type === 'checkbox' ? checked : value
          }));
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               setIsSaving(true);
               await updateRealtor(id, formData);
               navigate("/admin/realtors");
          } catch (err) {
               console.error("Failed to update realtor:", err);
               setError("Failed to update realtor. Please try again.");
          } finally {
               setIsSaving(false);
          }
     };

     if (isLoading) {
          return (
               <div className="flex items-center justify-center min-h-screen">
                    <Loader2 className="w-8 h-8 animate-spin text-[#BF9A68]" />
               </div>
          );
     }

     return (
          <div className="relative min-h-screen p-6">
               <div className="absolute top-0 right-0  bg-[#BF9A68]/10 rounded-full blur-3xl pointer-events-none"></div>
               <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8E653A]/10 rounded-full blur-3xl pointer-events-none"></div>

               <div className=" relative z-10">
                    <button
                         onClick={() => navigate("/admin/realtors")}
                         className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
                    >
                         <ArrowLeft className="w-4 h-4" />
                         Back to Realtors
                    </button>

                    <div className="bg-[#4545456b]  backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 sm:p-8">
                         <h1 className="text-2xl font-bold text-white mb-6">Edit Realtor</h1>

                         {error && (
                              <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-6">
                                   {error}
                              </div>
                         )}

                         <form onSubmit={handleSubmit} className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                   {/* Personal Info */}
                                   <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">First Name</label>
                                        <input
                                             type="text"
                                             name="first_name"
                                             value={formData.first_name}
                                             onChange={handleChange}
                                             className="w-full h-12 px-4 bg-[#454545] border border-gray-600 rounded-xl text-white focus:border-[#BF9A68] focus:ring-1 focus:ring-[#BF9A68] outline-none transition-all"
                                             required
                                        />
                                   </div>

                                   <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Last Name</label>
                                        <input
                                             type="text"
                                             name="last_name"
                                             value={formData.last_name}
                                             onChange={handleChange}
                                             className="w-full h-12 px-4 bg-[#454545] border border-gray-600 rounded-xl text-white focus:border-[#BF9A68] focus:ring-1 focus:ring-[#BF9A68] outline-none transition-all"
                                             required
                                        />
                                   </div>

                                   <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Email</label>
                                        <input
                                             type="email"
                                             name="email"
                                             value={formData.email}
                                             onChange={handleChange}
                                             className="w-full h-12 px-4 bg-[#454545] border border-gray-600 rounded-xl text-white focus:border-[#BF9A68] focus:ring-1 focus:ring-[#BF9A68] outline-none transition-all"
                                             required
                                        />
                                   </div>

                                   <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Phone</label>
                                        <input
                                             type="text"
                                             name="phone"
                                             value={formData.phone}
                                             onChange={handleChange}
                                             className="w-full h-12 px-4 bg-[#454545] border border-gray-600 rounded-xl text-white focus:border-[#BF9A68] focus:ring-1 focus:ring-[#BF9A68] outline-none transition-all"
                                        />
                                   </div>

                                   {/* Business Info */}
                                   <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Commission Rate (%)</label>
                                        <input
                                             type="number"
                                             name="commission_rate"
                                             value={formData.commission_rate}
                                             onChange={handleChange}
                                             step="0.01"
                                             className="w-full h-12 px-4 bg-[#454545] border border-gray-600 rounded-xl text-white focus:border-[#BF9A68] focus:ring-1 focus:ring-[#BF9A68] outline-none transition-all"
                                        />
                                   </div>

                                   <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Calendar Name</label>
                                        <input
                                             type="text"
                                             name="calendarName"
                                             value={formData.calendarName}
                                             onChange={handleChange}
                                             className="w-full h-12 px-4 bg-[#454545] border border-gray-600 rounded-xl text-white focus:border-[#BF9A68] focus:ring-1 focus:ring-[#BF9A68] outline-none transition-all"
                                        />
                                   </div>

                                   <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-medium text-gray-300">Address</label>
                                        <input
                                             type="text"
                                             name="address"
                                             value={formData.address}
                                             onChange={handleChange}
                                             className="w-full h-12 px-4 bg-[#454545] border border-gray-600 rounded-xl text-white focus:border-[#BF9A68] focus:ring-1 focus:ring-[#BF9A68] outline-none transition-all"
                                        />
                                   </div>

                                   <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-medium text-gray-300">Unique Affiliate Link</label>
                                        <input
                                             type="text"
                                             name="unique_affiliate_link"
                                             value={formData.unique_affiliate_link}
                                             onChange={handleChange}
                                             className="w-full h-12 px-4 bg-[#454545] border border-gray-600 rounded-xl text-white focus:border-[#BF9A68] focus:ring-1 focus:ring-[#BF9A68] outline-none transition-all"
                                        />
                                   </div>

                                   <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-medium text-gray-300">Notes</label>
                                        <textarea
                                             name="notes"
                                             value={formData.notes}
                                             onChange={handleChange}
                                             rows="4"
                                             className="w-full p-4 bg-[#454545] border border-gray-600 rounded-xl text-white focus:border-[#BF9A68] focus:ring-1 focus:ring-[#BF9A68] outline-none transition-all resize-none"
                                        />
                                   </div>

                                   <div className="flex items-center gap-3">
                                        <input
                                             type="checkbox"
                                             name="is_active"
                                             id="is_active"
                                             checked={formData.is_active}
                                             onChange={handleChange}
                                             className="w-5 h-5 rounded border-gray-600 text-[#BF9A68] focus:ring-[#BF9A68] bg-[#454545]"
                                        />
                                        <label htmlFor="is_active" className="text-sm font-medium text-gray-300">
                                             Active Account
                                        </label>
                                   </div>
                              </div>

                              <div className="flex justify-end gap-4 pt-6 border-t border-gray-700/50">
                                   <button
                                        type="button"
                                        onClick={() => navigate("/admin/realtors")}
                                        className="px-6 py-3 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                                   >
                                        Cancel
                                   </button>
                                   <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex items-center gap-2 bg-gradient-to-r from-[#8E653A] to-[#BF9A68] hover:from-[#BF9A68] hover:to-[#8E653A] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#8E653A]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                   >
                                        {isSaving ? (
                                             <>
                                                  <Loader2 className="w-4 h-4 animate-spin" />
                                                  Saving...
                                             </>
                                        ) : (
                                             <>
                                                  <Save className="w-4 h-4" />
                                                  Save Changes
                                             </>
                                        )}
                                   </button>
                              </div>
                         </form>
                    </div>
               </div>
          </div>
     );
};

export default EditRealtor;
