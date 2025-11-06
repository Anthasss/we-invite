import { useState, useEffect } from "react"
import CatalogueFilters from "./CatalogueFilters"
import CatalogueGrid from "./CatalogueGrid"
import { getProducts } from "../../../services/productApi"
import CatalogueGridItems from "../../../json/catalogueGridItems.json"

export default function Catalogue() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedFilter, setSelectedFilter] = useState("Semua")

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await getProducts()
      console.log('Fetched products:', data)
      // Transform API response to match component format
      const transformedProducts = data.map(item => ({
        id: item.id,
        title: item.name,
        price: item.price,
        image: item.thumbnail,
        tags: Array.isArray(item.tags) 
          ? item.tags.map(tag => typeof tag === 'string' ? tag : tag.name || String(tag))
          : []
      }))
      setProducts(transformedProducts)
    } catch (err) {
      console.error('Failed to fetch products:', err)
      setError('Failed to load products. Using local data.')
      // Fallback to local JSON data
      setProducts(CatalogueGridItems)
    } finally {
      setIsLoading(false)
    }
  }

  // Extract unique tags from all products
  const extractFilters = () => {
    const allTags = products.flatMap(product => product.tags || [])
    const uniqueTags = [...new Set(allTags)].sort()
    return ["Semua", ...uniqueTags]
  }

  const catalogueFilters = extractFilters()

  return (
    <div className="h-auto w-full flex flex-col items-center justify-center bg-primary"> 
      <CatalogueFilters
        filters={catalogueFilters}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      <CatalogueGrid 
        products={products}
        selectedFilter={selectedFilter}
        isLoading={isLoading}
        error={error}
      />
    </div>
  )
}