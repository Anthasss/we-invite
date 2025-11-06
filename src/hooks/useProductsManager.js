import { useState, useEffect } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../services/productApi";
import catalogueItems from "../json/catalogueGridItems.json";

/**
 * Custom hook to manage products state and operations
 * @returns {Object} Products state and CRUD operations
 */
export const useProductsManager = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Transform API response to component format
  const transformProduct = (item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    thumbnail: item.thumbnail,
    gallery: item.galleryUrls || [],
    tags: Array.isArray(item.tags)
      ? item.tags.map(tag => typeof tag === 'string' ? tag : tag.name || String(tag))
      : []
  });

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getProducts();
      const transformedProducts = data.map(transformProduct);
      setProducts(transformedProducts);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('Failed to load products. Using local data.');
      // Fallback to local JSON data
      setProducts(
        catalogueItems.map(item => ({
          id: item.id,
          name: item.title,
          price: parseInt(item.price),
          image: item.image,
          tags: item.tags
        }))
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle saving product (add or update)
  const handleSaveProduct = async (productData, editingProduct) => {
    if (editingProduct) {
      // Update existing product
      const updatedProduct = await updateProduct(editingProduct.id, productData);
      const transformed = transformProduct(updatedProduct);
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? transformed : p));
      return { success: true, message: 'Product updated successfully' };
    } else {
      // Add new product
      const newProduct = await createProduct(productData);
      const transformed = transformProduct(newProduct);
      setProducts(prev => [...prev, transformed]);
      return { success: true, message: 'Product created successfully' };
    }
  };

  // Handle deleting product
  const handleDeleteProduct = async (productId) => {
    await deleteProduct(productId);
    setProducts(prev => prev.filter(p => p.id !== productId));
    return { success: true, message: 'Product deleted successfully' };
  };

  return {
    products,
    isLoading,
    error,
    handleSaveProduct,
    handleDeleteProduct
  };
};
