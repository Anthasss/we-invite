import api from './api';

/**
 * Create a new order
 * @param {Object} payload - Order data
 * @param {string} payload.orderId - Order ID
 * @param {string} payload.userId - User ID
 * @param {string} payload.productId - Product ID
 * @param {Object} payload.weddingInfo - Wedding information
 * @returns {Promise} Order creation response
 */
export const createOrder = async (payload) => {
  try {
    const response = await api.post('/api/orders', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
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
