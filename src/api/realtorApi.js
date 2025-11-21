import api from "./api";

export const getRealtorProfile = async () => {
  const response = await api.get("/realtors/me");
  return response.data;
};

export const getRealtorReferrals = async (page = 1, limit = 10) => {
  const response = await api.get(`/referrals?page=${page}&limit=${limit}`);
  return response.data;
};

export const updateRealtorProfile = async (data) => {
  const response = await api.put("/auth/update-profile", data);
  return response.data;
};

export const updateRealtorPassword = async (data) => {
  const response = await api.put("/auth/update-password", data);
  return response.data;
};

export const uploadRealtorProfileImage = async (formData) => {
  const response = await api.post("/profile/upload-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteRealtorProfileImage = async () => {
  const response = await api.delete("/profile/delete-image");
  return response.data;
};
