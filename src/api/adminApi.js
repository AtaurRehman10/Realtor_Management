import api from "./api";

export const getAdminStats = async () => {
  const response = await api.get("/get-admin-stats");
  return response.data;
};

export const getAdminReferrals = async (page = 1, limit = 10) => {
  const response = await api.get(`/referrals/by-admin?page=${page}&limit=${limit}`);
  return response.data;
};    

export const getAdminRealtors = async (page = 1, limit = 10) => {
  const response = await api.get(`/realtors?page=${page}&limit=${limit}`);
  return response.data;
};

export const getRealtorById = async (id) => {
  const response = await api.get(`/realtors/${id}`);
  return response.data;
};

export const updateRealtor = async (id, data) => {
  const response = await api.put(`/realtors/${id}`, data);
  return response.data;
};

export const deleteRealtor = async (id) => {
  const response = await api.delete(`/realtors/${id}`);
  return response.data;
};

export const getReferralsByRealtorId = async (id, page = 1, limit = 10) => {
  const response = await api.get(`/referrals/realtor/${id}?page=${page}&limit=${limit}`);
  return response.data;
};
