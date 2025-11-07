import api from './api';

/**
 * Create a new order
 * @param {Object|FormData} payload - Order data (can be object or FormData for file uploads)
 * @returns {Promise} Order creation response
 */
export const createOrder = async (payload) => {
  try {
    // For FormData, don't set Content-Type - let Axios handle it automatically
    // This ensures the boundary is set correctly
    const response = await api.post('/api/orders', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    console.error('Backend response:', error.response?.data);
    throw error;
  }
};

/**
 * Get order by ID
 * @param {string} orderId - Order ID
 * @returns {Promise} Order data
 */
export const getOrderById = async (orderId) => {
  try {
    const response = await api.get(`/api/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

/**
 * Get all orders for a user
 * @param {string} userId - User ID
 * @returns {Promise} Array of orders
 */
export const getOrdersByUser = async (userId) => {
  try {
    const response = await api.get(`/api/orders/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
};

/**
 * Get all orders (admin)
 * @returns {Promise} Array of all orders
 */
export const getAllOrders = async () => {
  try {
    const response = await api.get('/api/orders');
    return response.data;
  } catch (error) {
    console.error('Error fetching all orders:', error);
    throw error;
  }
};

/**
 * Update order status
 * @param {string} orderId - Order ID
 * @param {string} status - New status
 * @returns {Promise} Updated order data
 */
export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await api.patch(`/api/orders/${orderId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

/**
 * Get order status from Midtrans
 * @param {string} orderId - Order ID
 * @returns {Promise} Order status data
 */
export const getOrderStatus = async (orderId) => {
  try {
    const response = await api.get(`/api/midtrans/transaction/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order status:', error);
    throw error;
  }
};
