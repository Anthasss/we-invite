import PageHeader from "../../components/shared/pageHeader";
import ProductCard from "../../components/admin/productCard";

export default function ProductsPage() {
  const dummyProduct = {
    id: 1,
    name: "Sample Product",
    price: 75000,
    image: "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
    tags: ["New", "Popular"],
  }

  return (
    <div className="w-full min-h-screen p-8 pt-16">
      <PageHeader title="Products Page" />

      {/* product cards */}
      <div className="h-screen grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 gap-6 mt-6">
        <ProductCard product={ dummyProduct } />
      </div>
    </div>
  );
}
