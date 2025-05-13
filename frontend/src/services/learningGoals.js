import api from './api';

const BASE = '/api/learning-goals';

const learningGoals = {
  getByUser: (userId) => api.get(`${BASE}/user/${userId}`),
  getByCategory: (category) => api.get(`${BASE}/category/${category}`),
  getById: (id) => api.get(`${BASE}/${id}`),
  create: (goal) => api.post(BASE, goal),
  update: (id, goal) => api.put(`${BASE}/${id}`, goal),
  delete: (id) => api.delete(`${BASE}/${id}`),
  getByUserAndStatus: (userId, status) => api.get(`${BASE}/user/${userId}/status/${status}`),
};

export default learningGoals; 