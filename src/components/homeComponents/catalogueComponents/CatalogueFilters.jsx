export default function CatalogueFilters({ filters, selectedFilter, setSelectedFilter }) {
  return (
    <>
      <div className="divider divider-start divider-secondary divider-lg text-secondary text-2xl px-8 pt-8">Catalogue</div>
      <div className="w-full h-auto flex items-center justify-start p-8 gap-4">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-full border-4 border-secondary ${
              selectedFilter === filter ? "bg-secondary text-primary" : "bg-primary text-secondary hover:bg-secondary/90 hover:text-primary"
            }`}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </>
  );
}
