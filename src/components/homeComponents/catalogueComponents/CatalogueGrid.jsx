import CatalogueGridItem from "./CatalogueGridItem";

export default function CatalogueGrid() {
  return (
    <div className="h-full w-full p-4 bg-secondary grid gap-4 grid-flow-row md:grid-rows-2 md:grid-cols-6">
      {Array.from({ length: 8 }, (_, index) => (
        <CatalogueGridItem key={index} image={"/5.png"} title={`Item ${index + 1}`} price={(index + 1) * 10000} />
      ))}
    </div>
  );
}

