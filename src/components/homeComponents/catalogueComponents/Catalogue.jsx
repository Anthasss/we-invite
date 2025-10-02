import { useState } from "react"
import catalogueFilters from "../../../json/catalogueFilters.json"
import CatalogueFilters from "./CatalogueFilters"
import CatalogueGrid from "./CatalogueGrid"

export default function Catalogue() {
  const [selectedFilter, setSelectedFilter] = useState(catalogueFilters[0])

  return (
    <div className="h-auto w-full flex flex-col items-center justify-center bg-primary"> 
      <CatalogueFilters
        filters={catalogueFilters}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      <CatalogueGrid selectedFilter={selectedFilter} />
    </div>
  )
}