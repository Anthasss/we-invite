import FeaturesListGridItem from "./FeaturesListGridItem";
import featuresData from "../../../json/featuresListGridItems.json";

export default function FeaturesListGrid() {
  return (
    <div className="w-full h-full pt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
        {featuresData.map((feature) => (
          <FeaturesListGridItem 
            key={feature.id}
            title={feature.title}
            iconName={feature.iconName}
          />
        ))}
      </div>
    </div>
  );
}
