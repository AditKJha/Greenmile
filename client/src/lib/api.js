import axios from 'axios';
const baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

const api = axios.create({ baseURL });
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const adminApi = axios.create({ baseURL });
adminApi.interceptors.request.use(config => {
  const token = localStorage.getItem('admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const optimizeRoute = (payload) => api.post('/api/route/optimize', payload).then(r=>r.data);
export const getWeather = (q) => api.get(`/api/weather/${encodeURIComponent(q)}`).then(r=>r.data);
export const getBattery = () => api.get('/api/battery/status').then(r=>r.data);
export const getStations = (lat, lon, distanceKm=50) => api.get(`/api/charging-stations?lat=${lat}&lon=${lon}&distanceKm=${distanceKm}`).then(r=>r.data);

export const adminGetMetrics = () => adminApi.get('/api/admin/metrics').then(r=>r.data);
export const adminGetUsers = () => adminApi.get('/api/admin/users').then(r=>r.data);
export const adminDeleteUser = (id) => adminApi.delete(`/api/admin/users/${id}`).then(r=>r.data);
export const adminGetTrips = () => adminApi.get('/api/admin/trips').then(r=>r.data);

export default api;
