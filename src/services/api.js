import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
});

// Add request interceptor to handle Content-Type dynamically
api.interceptors.request.use((config) => {
  // If data is FormData, don't set Content-Type (let browser set it with boundary)
  if (config.data instanceof FormData) {
    // Remove Content-Type header so browser can set it correctly
    delete config.headers['Content-Type'];
  } else {
    // For other requests, set JSON
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

// Midtrans API functions
export const createMidtransTransaction = async (payload) => {
  try {
    const response = await api.post('/api/midtrans/create-transaction', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating Midtrans transaction:', error);
    throw error;
  }
};

export default api;