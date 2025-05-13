import axios from 'axios';

const api = axios.create({
  baseURL: '/',
  withCredentials: true,
});

export const auth = {
  // Check if user is authenticated
  getStatus: () => api.get('/api/auth/status'),
  // Login with Google
  getLoginUrl: () => api.get('/api/auth/login'),
  // Logout
  logout: () => api.post('/api/auth/logout'),
};

export const user = {
  // Get current user details
  getCurrent: () => api.get('/oauth2/user'),
};

export const dashboard = {
  // Get dashboard data
  getData: () => api.get('/api/dashboard'),
};

export default api; 