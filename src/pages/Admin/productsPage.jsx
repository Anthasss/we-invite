import { useState } from "react";
import PageHeader from "../../components/shared/pageHeader";
import ProductCard from "../../components/admin/productCard";
import catalogueItems from "../../json/catalogueGridItems.json";

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 6;

  // Filter items based on search query
  const filteredItems = catalogueItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
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

  return (
    <div className="w-full min-h-screen p-8 pt-16">
      <PageHeader
        title="Products Page"
        onSearch={handleSearch}
        onAction={() => console.log("Add New")}
      />

      {/* product cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
        {currentItems.map((item) => (
          <ProductCard 
            key={item.id}
            product={{
              id: item.id,
              name: item.title,
              price: parseInt(item.price),
              image: item.image,
              tags: item.tags
            }} 
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
    </div>
  );
}
