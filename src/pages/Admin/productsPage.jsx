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
      <PageHeader title="Products Page" onSearch={ (value) => console.log(value) } onAction={ () => console.log("Add New") } />

      {/* product cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
        <ProductCard product={ dummyProduct } />
        <ProductCard product={ dummyProduct } />
        <ProductCard product={ dummyProduct } />
        <ProductCard product={ dummyProduct } />
        <ProductCard product={ dummyProduct } />
        <ProductCard product={ dummyProduct } />
      </div>
    </div>
  );
}
