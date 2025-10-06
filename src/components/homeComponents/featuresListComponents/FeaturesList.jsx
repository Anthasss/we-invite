import FeaturesListGrid from "./FeaturesListGrid"

export default function FeaturesList() {
  return (
    <div className="w-full h-screen bg-primary">
      <div className="divider divider-start divider-secondary divider-lg text-secondary text-2xl px-8 pt-12">Features List</div>

      {/* feature grid */}
      <FeaturesListGrid />
    </div>
  )
}