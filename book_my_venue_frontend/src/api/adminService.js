import api from "./api";

export const getPendingVenues = async () => {
  const response = await api.get("/admin/venues/pending");
  return response.data;
};

export const getApprovedVenues = async () => {
  const response = await api.get("/admin/venues/approved");
  return response.data;
};

export const approveVenue = async (venueId) => {
  const response = await api.patch(`/admin/venues/${venueId}/approve`);
  return response.data;
};

export const rejectVenue = async (venueId) => {
  const response = await api.patch(`/admin/venues/${venueId}/reject`);
  return response.data;
};

// ---- Dashboard ----
export const getDashboardStats = async () => {
  const response = await api.get("/admin/dashboard");
  return response.data;
};

// ---- Bookings ----
export const getAllBookingsForAdmin = async () => {
  const response = await api.get("/admin/bookings");
  return response.data;
};

// ---- Reviews ----
export const getAllReviewsForAdmin = async () => {
  const response = await api.get("/admin/reviews");
  return response.data;
};

export const deleteReviewAsAdmin = async (reviewId) => {
  const response = await api.delete(`/admin/reviews/${reviewId}`);
  return response.data;
};