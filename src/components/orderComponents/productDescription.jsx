export default function productDescription({ product }) {
  return (
    <div className="w-full h-full p-8">
      <div className="w-full h-full bg-primary flex flex-col md:flex-row gap-8 md:gap-0 items-center justify-center rounded-xl p-4">
        {/* product cover */}
        <div className="flex-1 h-full flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-auto object-cover rounded-lg"
          />
        </div>

        {/* product name */}
        <div className="flex-1 h-full flex flex-col justify-center gap-8 text-secondary">
          <div>
            <h1 className="font-bold text-4xl">Product Name</h1>
            <h1 className="ml-4 text-3xl">{product.title}</h1>
          </div>

          <div>
            <h1 className="font-bold text-4xl">Price</h1>
            <h1 className="ml-4 text-3xl">Rp {product.price}</h1>
          </div>

          <div>
            <h1 className="font-bold  text-4xl">Tags:</h1>
            {product.tags.map((tag, index) => (
              <h1
                key={index}
                className="text-3xl ml-4"
              >
                - {tag}
              </h1>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
