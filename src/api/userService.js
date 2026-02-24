import API from "./api";

// Owner details
export const getUserById = (id) =>
  API.get(`/users/${id}`);

// Update user
export const updateUser = (id, data) =>
  API.put(`/users/${id}`, data);