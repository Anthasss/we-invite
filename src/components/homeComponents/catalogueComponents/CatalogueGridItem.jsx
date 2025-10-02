import { ShoppingCart } from "lucide-react"

export default function CatalogueGridItem({image, title, price}) {
  return (
    <div className="bg-black/30 w-full h-full p-4 gap-2">
      <img src={image} alt={title} className="w-full h-auto mb-4" />
      <h1 className="text-primary">{title}</h1>
      <p className="text-primary mb-4">Rp {price}</p>

      <div className="flex justify-end">
        <button className="bg-primary px-2 py-2 rounded hover:bg-primary/80 text-sm transition text-secondary"><ShoppingCart className="w-4 h-4 inline-block mr-1" /> Pesan</button>
      </div>
    </div>
  )
}