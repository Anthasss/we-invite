import { useParams } from "react-router-dom";
import catalogueGridItems from "../json/catalogueGridItems.json";
import ProductDescription from "../components/orderComponents/productDescription";
import OrderForm from "../components/orderComponents/orderForm";

export default function Order() {
  const { productId } = useParams();
  const product = catalogueGridItems.find((item) => item.id === productId);

  return (
    <>
      <div className="w-full h-auto md:h-screen pt-10">
        <ProductDescription product={product} />
      </div>
      <OrderForm />
    </>
  );
}
