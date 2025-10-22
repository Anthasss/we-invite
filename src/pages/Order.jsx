import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productApi";
import catalogueGridItems from "../json/catalogueGridItems.json";
import ProductDescription from "../components/orderComponents/productDescription";
import OrderForm from "../components/orderComponents/orderForm";

export default function Order() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getProductById(productId);
      // Transform API response to match component format
      const transformedProduct = {
        id: data.id,
        title: data.name,
        price: data.price,
        image: data.imageUrl || data.image,
        tags: Array.isArray(data.tags) 
          ? data.tags.map(tag => typeof tag === 'string' ? tag : tag.name || String(tag))
          : []
      };
      setProduct(transformedProduct);
    } catch (err) {
      console.error('Failed to fetch product:', err);
      setError('Failed to load product. Using local data.');
      // Fallback to local JSON data
      const localProduct = catalogueGridItems.find((item) => item.id === productId);
      setProduct(localProduct);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Product not found</h2>
          <p className="text-gray-500">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-auto md:h-screen pt-10">
        <ProductDescription product={product} />
      </div>
      <div className="w-full h-screen">
        <OrderForm />
      </div>
    </>
  );
}
