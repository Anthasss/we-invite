import api from './api';

// Get all products or filter by tag
export const getProducts = async (tag = null) => {
  try {
    const url = tag ? `/api/products?tag=${tag}` : '/api/products';
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get a single product by ID
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Create a new product
export const createProduct = async (productData) => {
  try {
    const response = await api.post('/api/products', {
      name: productData.name,
      price: productData.price,
      imageUrl: productData.image,
      tags: productData.tags
    });
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Update an existing product
export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/api/products/${id}`, {
      name: productData.name,
      price: productData.price,
      imageUrl: productData.image,
      tags: productData.tags
    });
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
