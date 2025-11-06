export default function ProductCard({ product, onEdit, onDelete }) {
  const imageUrl = product.thumbnail;
  // Ensure tags is an array of strings
  const tags = Array.isArray(product.tags) 
    ? product.tags.map(tag => typeof tag === 'string' ? tag : tag.name || String(tag))
    : [];
  
  return (
    <div className="flex flex-col md:flex-row w-full bg-black/40 rounded-lg shadow-sm overflow-hidden">
      <div className="w-full md:w-48 md:h-auto flex-shrink-0">
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="flex flex-col justify-between p-4 flex-grow">
        <div>
          <h2 className="text-lg font-bold mb-2">{product.name}</h2>
          <p className="text-sm text-gray-300 mb-3">Rp. {product.price.toLocaleString()}</p>
          {tags.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-3">
              {tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 text-xs bg-white/10 rounded-full border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-2 justify-end">
          <button 
            onClick={() => onEdit(product)}
            className="px-3 py-1.5 text-sm bg-yellow-500 hover:bg-yellow-600 text-black rounded-md transition-colors"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(product.id)}
            className="px-3 py-1.5 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
