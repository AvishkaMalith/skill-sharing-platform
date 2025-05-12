import { create } from "zustand";
import axios from "axios";

// API base URL
const API_BASE_URL = "http://localhost:8080/api/users";

const useUserProfileStore = create((set) => ({
  userProfile: {},
  userProfiles: [],
  isFetching: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,

  // Fetch all user profiles
  fetchAllUserProfiles: async () => {
    set({ isFetching: true, error: null });
    try {
      const response = await axios.get(`${API_BASE_URL}`);
      set({ userProfiles: response.data || [], isFetching: false });
    } catch (error) {
      set({
        isFetching: false,
        error: error.message || "Failed to fetch users",
      });
    }
  },

  // Fetch a user profile by ID
  fetchUserProfileById: async (userId) => {
    set({ isFetching: true, error: null });
    try {
      const response = await axios.get(`${API_BASE_URL}/${userId}`);
      set({ userProfile: response.data || {}, isFetching: false });
    } catch (error) {
      set({
        isFetching: false,
        error: error.message || "Failed to fetch user profile",
      });
    }
  },

  // Create a new user profile (password removed for security)
  createUserProfile: async (userProfile) => {
    set({ isCreating: true, error: null });
    try {
      const response = await axios.post(`${API_BASE_URL}/create`, userProfile);
      set((state) => ({
        userProfiles: [...state.userProfiles, response.data],
        isCreating: false,
      }));
    } catch (error) {
      set({
        isCreating: false,
        error: error.message || "Failed to create user",
      });
    }
  },

  // Update an existing user profile
  updateUserProfile: async (userId, updatedData) => {
    set({ isUpdating: true, error: null });
    try {
      const response = await axios.put(`${API_BASE_URL}/update/${userId}`, {
        ...updatedData,
        updatedAt: new Date().toISOString(),
      });

      set((state) => ({
        userProfiles: state.userProfiles.map((user) =>
          user.userId === response.data.userId ? response.data : user
        ),
        isUpdating: false,
      }));
    } catch (error) {
      set({
        isUpdating: false,
        error: error.message || "Failed to update user",
      });
    }
  },

  // Delete a user profile
  deleteUserProfile: async (userId) => {
    set({ isDeleting: true, error: null });
    try {
      await axios.delete(`${API_BASE_URL}/delete/${userId}`);
      set((state) => ({
        userProfiles: state.userProfiles.filter(
          (user) => user.userId !== userId
        ),
        isDeleting: false,
      }));
    } catch (error) {
      set({
        isDeleting: false,
        error: error.message || "Failed to delete user",
      });
    }
  },
}));

export default useUserProfileStore;
