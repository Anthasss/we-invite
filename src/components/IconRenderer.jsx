import { Settings, Layout, Zap, Headphones } from 'lucide-react';

const iconMap = {
  Settings,
  Layout, 
  Zap,
  Headphones
};

export default function IconRenderer({ iconName, className = "w-6 h-6" }) {
  const IconComponent = iconMap[iconName];
  
  if (!IconComponent) {
    return <div className={`${className} bg-gray-300 rounded`} />;
  }
  
  return <IconComponent className={className} />;
}