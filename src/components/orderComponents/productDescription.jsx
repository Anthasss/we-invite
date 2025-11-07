import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function productDescription({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Use image array (includes thumbnail + gallery images)
  const images = product.image || [];

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="w-full h-full p-8">
      <div className="w-full h-full bg-primary flex flex-col md:flex-row gap-8 md:gap-0 items-center justify-center rounded-xl p-4">
        {/* product cover with carousel */}
        <div className="flex-1 h-full flex items-center justify-center relative group">
          <img
            src={images[currentImageIndex]}
            alt={`${product.title} - Image ${currentImageIndex + 1}`}
            className="h-full w-auto object-cover rounded-lg"
          />
          
          {/* Navigation arrows - only show if multiple images */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-16 top-1/2 btn btn-circle btn-sm bg-base-100/80 hover:bg-base-100 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-16 top-1/2 btn btn-circle btn-sm bg-base-100/80 hover:bg-base-100 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
              
              {/* Image indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex 
                        ? 'bg-secondary w-6' 
                        : 'bg-base-100/60 hover:bg-base-100/80'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* product name */}
        <div className="flex-1 h-full flex flex-col justify-center gap-8 text-secondary">
          <div>
            <h1 className="font-bold text-4xl">Product Name</h1>
            <h1 className="ml-4 text-3xl">{product.title}</h1>
          </div>

          <div>
            <h1 className="font-bold text-4xl">Price</h1>
            <h1 className="ml-4 text-3xl">Rp {product.price.toLocaleString('id-ID')}</h1>
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
