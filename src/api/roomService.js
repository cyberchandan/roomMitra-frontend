import API from "./api";

// GET all rooms (pagination support)
export const getRooms = (page = 1) =>
  API.get(`/rooms?page=${page}&limit=10`);

// GET single room
export const getRoomById = (id) =>
  API.get(`/rooms/${id}`);

// CREATE room
export const createRoom = (data) =>
  API.post(`/rooms`, data);

// UPDATE room
export const updateRoom = (id, data) =>
  API.put(`/rooms/${id}`, data);

// DELETE room
export const deleteRoom = (id) =>
  API.delete(`/rooms/${id}`);

// FILTER rooms
export const filterRooms = (filters) =>
  API.post(`/rooms/filter`, filters);

// SEARCH rooms
export const searchRooms = (query) =>
  API.get(`/rooms/search?query=${query}`);