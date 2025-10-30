import ProductCard from "./productCard";

/**
 * Grid component to display product cards
 * @param {Array} products - Array of products to display
 * @param {Function} onEdit - Callback for editing a product
 * @param {Function} onDelete - Callback for deleting a product
 */
export default function ProductsGrid({ products, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
      {products.map((item) => (
        <ProductCard 
          key={item.id}
          product={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
