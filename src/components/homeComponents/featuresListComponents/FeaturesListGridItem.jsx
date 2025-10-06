import IconRenderer from "../../IconRenderer";

export default function FeaturesListGridItem({ title, iconName }) {
  return (
    <div className="bg-secondary bg-opacity-10 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-2">
        <IconRenderer
          iconName={iconName}
          className="text-primary w-8 h-8 flex-shrink-0 mt-1"
        />

        <h3 className="text-xl font-semibold text-primary">{title}</h3>
      </div>
    </div>
  );
}
