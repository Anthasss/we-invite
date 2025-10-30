/**
 * Empty state component when no products match search
 * @param {string} searchQuery - The search query that returned no results
 */
export default function EmptyState({ searchQuery }) {
  return (
    <div className="text-center text-gray-400 mt-8">
      {searchQuery 
        ? `No products found matching "${searchQuery}"`
        : "No products available"
      }
    </div>
  );
}
