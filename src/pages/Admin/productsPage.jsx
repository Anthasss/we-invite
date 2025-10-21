import { useState } from "react";
import PageHeader from "../../components/shared/pageHeader";
import ProductCard from "../../components/admin/productCard";
import ProductModal from "../../components/admin/productModal";
import catalogueItems from "../../json/catalogueGridItems.json";

export default function ProductsPage() {
  const [products, setProducts] = useState(
    catalogueItems.map(item => ({
      id: item.id,
      name: item.title,
      price: parseInt(item.price),
      image: item.image,
      tags: item.tags
    }))
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const itemsPerPage = 6;

  // Filter products based on search query
  const filteredItems = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  // Handle saving product (add or update)
  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      // Update existing product
      setProducts(prev => prev.map(p => 
        p.id === productData.id ? productData : p
      ));
    } else {
      // Add new product
      setProducts(prev => [...prev, productData]);
    }
  };

  return (
    <div className="w-full min-h-screen p-8 pt-16">
      <PageHeader
        title="Products Page"
        onSearch={handleSearch}
        onAction={handleAddProduct}
      />

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

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
    </div>
  );
}
