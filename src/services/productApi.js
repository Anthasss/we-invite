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
    const formData = new FormData();
    
    // Add basic fields
    formData.append('name', productData.name);
    formData.append('price', productData.price);
    formData.append('tags', JSON.stringify(productData.tags));
    
    // Add thumbnail image (required)
    if (productData.thumbnail instanceof File) {
      formData.append('thumbnail', productData.thumbnail);
    }
    
    // Add gallery images (up to 5, optional)
    if (productData.gallery && Array.isArray(productData.gallery)) {
      const maxGallery = Math.min(productData.gallery.length, 5);
      for (let i = 0; i < maxGallery; i++) {
        const galleryFile = productData.gallery[i];
        if (galleryFile instanceof File) {
          formData.append('gallery', galleryFile);
        }
      }
    }
    
    const response = await api.post('/api/products', formData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Update an existing product
export const updateProduct = async (id, productData) => {
  try {
    const formData = new FormData();
    
    // Add basic fields
    formData.append('name', productData.name);
    formData.append('price', productData.price);
    formData.append('tags', JSON.stringify(productData.tags));
    
    // Add thumbnail image if provided (optional for updates)
    if (productData.thumbnail instanceof File) {
      formData.append('thumbnail', productData.thumbnail);
    }
    
    // Add gallery images if provided (up to 5, optional)
    if (productData.gallery && Array.isArray(productData.gallery)) {
      const maxGallery = Math.min(productData.gallery.length, 5);
      for (let i = 0; i < maxGallery; i++) {
        const galleryFile = productData.gallery[i];
        if (galleryFile instanceof File) {
          formData.append('gallery', galleryFile);
        }
      }
    }
    
    const response = await api.put(`/api/products/${id}`, formData);
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
