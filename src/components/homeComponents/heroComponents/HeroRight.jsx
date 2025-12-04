import { useState, useEffect } from "react";
import { getProducts } from "../../../services/productApi";

export default function HeroRight() {
  const [thumbnails, setThumbnails] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all product thumbnails
  useEffect(() => {
    const fetchThumbnails = async () => {
      try {
        const products = await getProducts();
        const thumbs = products.map(product => product.thumbnail).filter(Boolean);
        setThumbnails(thumbs);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product thumbnails:", error);
        setIsLoading(false);
      }
    };

    fetchThumbnails();
  }, []);

  // Cycle through thumbnails
  useEffect(() => {
    if (thumbnails.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % thumbnails.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [thumbnails.length]);

  return (
    <div className="flex-1 hidden md:flex flex-col items-center justify-center space-y-6 w-full h-screen">
      {/* placeholder for an actual invitation cover */}
      <div className="w-4/5 h-4/5 bg-white/30 border-2 border-white/50 rounded-lg shadow-lg flex items-center justify-center overflow-hidden relative">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <span className="loading loading-spinner loading-lg text-white"></span>
          </div>
        ) : thumbnails.length > 0 ? (
          thumbnails.map((thumbnail, index) => (
            <img
              key={index}
              src={thumbnail}
              alt={`Wedding Invitation ${index + 1}`}
              className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))
        ) : (
          <img 
            src="/heropic.png" 
            alt="Wedding Invitation Preview" 
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
}
