import { useState, useEffect } from "react";
import PageHeader from "../../components/shared/pageHeader";
import ProductCard from "../../components/admin/productCard";
import ProductModal from "../../components/admin/productModal";
import ConfirmationModal from "../../components/shared/ConfirmationModal";
import Toast from "../../components/shared/Toast";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../../services/productApi";
import catalogueItems from "../../json/catalogueGridItems.json";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ isOpen: false, productId: null });
  const [toast, setToast] = useState(null);
  const itemsPerPage = 6;

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getProducts();
      // Transform API response to match our component format
      const transformedProducts = data.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.imageUrl,
        tags: Array.isArray(item.tags) 
          ? item.tags.map(tag => typeof tag === 'string' ? tag : tag.name || String(tag))
          : []
      }));
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

  // Filter products based on search query
  const filteredItems = products.filter((product) => {
    const searchLower = searchQuery.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(searchLower);
    const tagMatch = product.tags.some((tag) => {
      const tagString = typeof tag === 'string' ? tag : String(tag);
      return tagString.toLowerCase().includes(searchLower);
    });
    return nameMatch || tagMatch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // Handle search and reset to page 1
  const handleSearch = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  // Handle adding new product
  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  // Handle editing product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  // Handle deleting product
  const handleDeleteProduct = (productId) => {
    setConfirmDelete({ isOpen: true, productId });
  };

  // Confirm delete product
  const confirmDeleteProduct = async () => {
    try {
      await deleteProduct(confirmDelete.productId);
      // Remove from local state
      setProducts(prev => prev.filter(p => p.id !== confirmDelete.productId));
      setToast({ message: 'Product deleted successfully', type: 'success' });
    } catch (err) {
      console.error('Failed to delete product:', err);
      setToast({ message: 'Failed to delete product. Please try again.', type: 'error' });
    }
  };

  // Handle saving product (add or update)
  const handleSaveProduct = async (productData) => {
    try {
      if (editingProduct) {
        // Update existing product
        const updatedProduct = await updateProduct(editingProduct.id, productData);
        setProducts(prev => prev.map(p => 
          p.id === editingProduct.id ? {
            id: updatedProduct.id,
            name: updatedProduct.name,
            price: updatedProduct.price,
            image: updatedProduct.imageUrl,
            tags: Array.isArray(updatedProduct.tags) 
              ? updatedProduct.tags.map(tag => typeof tag === 'string' ? tag : tag.name || String(tag))
              : []
          } : p
        ));
        setToast({ message: 'Product updated successfully', type: 'success' });
      } else {
        // Add new product
        const newProduct = await createProduct(productData);
        setProducts(prev => [...prev, {
          id: newProduct.id,
          name: newProduct.name,
          price: newProduct.price,
          image: newProduct.imageUrl,
          tags: Array.isArray(newProduct.tags) 
            ? newProduct.tags.map(tag => typeof tag === 'string' ? tag : tag.name || String(tag))
            : []
        }]);
        setToast({ message: 'Product created successfully', type: 'success' });
      }
    } catch (err) {
      console.error('Failed to save product:', err);
      setToast({ message: 'Failed to save product. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="w-full min-h-screen p-8 pt-16">
      <PageHeader
        title="Products Page"
        onSearch={handleSearch}
        onAction={handleAddProduct}
      />

      {/* Error message */}
      {error && (
        <div className="alert alert-warning mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Loading state */}
      {isLoading ? (
        <div className="flex justify-center items-center mt-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          {/* product cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
            {currentItems.map((item) => (
              <ProductCard 
                key={item.id}
                product={item}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>

          {/* Show message if no results */}
          {filteredItems.length === 0 && (
            <div className="text-center text-gray-400 mt-8">
              No products found matching "{searchQuery}"
            </div>
          )}

          {/* pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="join">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    className={`join-item btn text-secondary ${
                      currentPage === index + 1 ? "btn-active" : ""
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmDelete.isOpen}
        onClose={() => setConfirmDelete({ isOpen: false, productId: null })}
        onConfirm={confirmDeleteProduct}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonClass="btn-error"
      />

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
