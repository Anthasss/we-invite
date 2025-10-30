import { useState } from "react";
import PageHeader from "../../components/shared/pageHeader";
import ProductsGrid from "../../components/admin/ProductsGrid";
import ProductModal from "../../components/admin/productModal";
import ConfirmationModal from "../../components/shared/ConfirmationModal";
import Toast from "../../components/shared/Toast";
import Pagination from "../../components/admin/Pagination";
import EmptyState from "../../components/admin/EmptyState";
import LoadingSpinner from "../../components/admin/LoadingSpinner";
import ErrorAlert from "../../components/admin/ErrorAlert";
import { useProductsManager } from "../../hooks/useProductsManager";

export default function AdminProductsPage() {
  const { products, isLoading, error, handleSaveProduct, handleDeleteProduct } = useProductsManager();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ isOpen: false, productId: null });
  const [toast, setToast] = useState(null);
  
  const itemsPerPage = 6;

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

  // Handle delete button click
  const handleDeleteClick = (productId) => {
    setConfirmDelete({ isOpen: true, productId });
  };

  // Confirm delete product
  const confirmDeleteProduct = async () => {
    try {
      const result = await handleDeleteProduct(confirmDelete.productId);
      setToast({ message: result.message, type: 'success' });
      setConfirmDelete({ isOpen: false, productId: null });
    } catch (err) {
      console.error('Failed to delete product:', err);
      setToast({ message: 'Failed to delete product. Please try again.', type: 'error' });
    }
  };

  // Handle save product
  const onSaveProduct = async (productData) => {
    try {
      const result = await handleSaveProduct(productData, editingProduct);
      setToast({ message: result.message, type: 'success' });
      setIsModalOpen(false);
      setEditingProduct(null);
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

      <ErrorAlert message={error} />

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <ProductsGrid 
            products={currentItems}
            onEdit={handleEditProduct}
            onDelete={handleDeleteClick}
          />

          {filteredItems.length === 0 && <EmptyState searchQuery={searchQuery} />}

          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={onSaveProduct}
        product={editingProduct}
      />

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
