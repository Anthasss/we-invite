import CatalogueGridItem from "./CatalogueGridItem";

export default function CatalogueGrid({ products, selectedFilter, isLoading, error }) {
  // Filter items based on selectedFilter
  const filteredItems = selectedFilter === "Semua" 
    ? products 
    : products.filter(item => 
        item.tags && item.tags.includes(selectedFilter)
      );

  return (
    <div className="h-full w-full p-4 bg-secondary">
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center text-white/80">
            <p className="text-xl font-semibold mb-2 text-warning">{error}</p>
          </div>
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="grid gap-4 grid-flow-row md:grid-cols-6">
          {filteredItems.map((item, index) => (
            <CatalogueGridItem 
              key={item.id || index} 
              image={item.image} 
              title={item.title} 
              price={item.price} 
              productId={item.id}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <div className="text-center text-white/80">
            <p className="text-xl font-semibold mb-2">No items available</p>
            <p className="text-sm">No invitations found for "{selectedFilter}" category</p>
          </div>
        </div>
      )}
    </div>
  );
}

