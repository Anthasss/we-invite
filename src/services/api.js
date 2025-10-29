import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Midtrans API functions
export const createMidtransTransaction = async (payload) => {
  try {
    const response = await api.post('/api/midtrans/transaction', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating Midtrans transaction:', error);
    throw error;
  }
};

export default api;
