import { useState, useEffect } from "react";
import CatalogueGridItem from "./CatalogueGridItem";
import { getProducts } from "../../../services/productApi";
import CatalogueGridItems from "../../../json/catalogueGridItems.json";

export default function CatalogueGrid({selectedFilter}) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getProducts();
      // Transform API response to match component format
      const transformedProducts = data.map(item => ({
        id: item.id,
        title: item.name,
        price: item.price,
        image: item.imageUrl || item.image,
        tags: Array.isArray(item.tags) 
          ? item.tags.map(tag => typeof tag === 'string' ? tag : tag.name || String(tag))
          : []
      }));
      setProducts(transformedProducts);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('Failed to load products. Using local data.');
      // Fallback to local JSON data
      setProducts(CatalogueGridItems);
    } finally {
      setIsLoading(false);
    }
  };

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

