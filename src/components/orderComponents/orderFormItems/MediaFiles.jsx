import OrderFormItem from "../orderFormItem";
import FormField from "../FormField";
import { OrderContext } from "../../../contexts/orderContext";
import { useContext } from "react";

export default function MediaFiles() {
  const { 
    gallery,
    setGallery
  } = useContext(OrderContext);

  return (
    <OrderFormItem label="Media Files">
      <div className="w-full space-y-6">

        {/* Gallery Section */}
        <div className="w-full">
          <h3 className="text-lg font-medium text-neutral mb-4">Photo Gallery</h3>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-2 md:gap-4 px-4">
            <div className="w-full">
              <span className="text-neutral w-full font-medium">Image Files:</span>
            </div>
            <div className="w-full">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setGallery(e.target.files)}
                className="input input-neutral w-full"
              />
            </div>
          </div>
          {gallery && gallery.length > 0 && (
            <div className="mt-4 space-y-2">
              <div className="text-sm font-medium text-gray-700">
                Selected {gallery.length} file(s):
              </div>
              <div className="max-h-32 overflow-y-auto">
                {Array.from(gallery).map((file, index) => (
                  <div key={index} className="text-sm text-gray-600 px-2">
                    • {file.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* File Requirements Note */}
        <div className="w-full bg-blue-50 border border-blue-200 rounded-md p-4">
          <h4 className="text-sm font-medium text-blue-800 mb-2">File Requirements:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Image files: JPG, PNG, GIF, etc.</li>
            <li>• Maximum file size: 10MB per file</li>
            <li>• Supports multiple image selection</li>
          </ul>
        </div>
        
      </div>
    </OrderFormItem>
  );
}