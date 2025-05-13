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

  // Follow a user
  followUser: async (followerId, followedId) => {
    set({ isFollowing: true, error: null });
    try {
      const response = await axios.post(
        `${API_BASE_URL}/follow/${followerId}/${followedId}`
      );

      set((state) => {
        // Update userProfiles
        const updatedUserProfiles = state.userProfiles.map((user) => {
          if (user.userId === followerId) {
            return {
              ...user,
              following: user.following
                ? [...user.following, followedId]
                : [followedId],
            };
          }
          if (user.userId === followedId) {
            return {
              ...user,
              followers: user.followers
                ? [...user.followers, followerId]
                : [followerId],
            };
          }
          return user;
        });

        // Update userProfile if it matches followerId or followedId
        const updatedUserProfile =
          state.userProfile.userId === followerId
            ? {
                ...state.userProfile,
                following: state.userProfile.following
                  ? [...state.userProfile.following, followedId]
                  : [followedId],
              }
            : state.userProfile.userId === followedId
            ? {
                ...state.userProfile,
                followers: state.userProfile.followers
                  ? [...state.userProfile.followers, followerId]
                  : [followerId],
              }
            : state.userProfile;

        return {
          userProfiles: updatedUserProfiles,
          userProfile: updatedUserProfile,
          isFollowing: false,
        };
      });

      return response.data;
    } catch (error) {
      set({
        isFollowing: false,
        error: error.message || "Failed to follow user",
      });
      throw error;
    }
  },
}));

export default useUserProfileStore;
