import CatalogueGridItem from "./CatalogueGridItem";
import CatalogueGridItems from "../../../json/catalogueGridItems.json";

export default function CatalogueGrid({selectedFilter}) {
  // Filter items based on selectedFilter
  const filteredItems = selectedFilter === "Semua" 
    ? CatalogueGridItems 
    : CatalogueGridItems.filter(item => 
        item.tags && item.tags.includes(selectedFilter)
      );

  return (
    <div className="h-full w-full p-4 bg-secondary">
      {filteredItems.length > 0 ? (
        <div className="grid gap-4 grid-flow-row md:grid-rows-2 md:grid-cols-6">
          {filteredItems.map((item, index) => (
            <CatalogueGridItem 
              key={index} 
              image={item.image} 
              title={item.title} 
              price={item.price} 
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

