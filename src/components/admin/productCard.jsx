export default function ProductCard({ product }) {
  return (
    <>
      <div className="card md:card-side w-full h-auto bg-black/40 shadow-sm">
        <figure>
          <img
            src={product.image}
            alt={product.name}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <p>Rp. {product.price}</p>
          {product.tags && (
            <div className="flex gap-2">
              {product.tags.map((tag, index) => (
                <div
                  key={index}
                  className="badge"
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
          <div className="card-actions justify-end">
            <button className="btn btn-warning">Edit</button>
            <button className="btn btn-error">Delete</button>
          </div>
        </div>
      </div>
    </>
  );
}
