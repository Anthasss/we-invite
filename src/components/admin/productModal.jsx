import { useState, useEffect } from "react";

export default function ProductModal({ isOpen, onClose, onSave, product = null }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    thumbnail: null,
    gallery: [],
    tags: ""
  });

  const [errors, setErrors] = useState({});
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  // Populate form when editing
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        thumbnail: null,
        gallery: [],
        tags: product.tags ? product.tags.join(", ") : ""
      });
      // Set preview for existing thumbnail
      setThumbnailPreview(product.thumbnail || product.image || product.imageUrl || "");
      // Set previews for existing gallery
      setGalleryPreviews(product.gallery || []);
    } else {
      setFormData({
        name: "",
        price: "",
        thumbnail: null,
        gallery: [],
        tags: ""
      });
      setThumbnailPreview("");
      setGalleryPreviews([]);
    }
    setErrors({});
  }, [product, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, thumbnail: file }));
      setThumbnailPreview(URL.createObjectURL(file));
      if (errors.thumbnail) {
        setErrors(prev => ({ ...prev, thumbnail: "" }));
      }
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      setErrors(prev => ({ ...prev, gallery: "Maximum 5 gallery images allowed" }));
      return;
    }
    setFormData(prev => ({ ...prev, gallery: files }));
    setGalleryPreviews(files.map(file => URL.createObjectURL(file)));
    if (errors.gallery) {
      setErrors(prev => ({ ...prev, gallery: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }
    
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = "Please enter a valid price";
    }
    
    // Only require thumbnail for new products
    if (!product && !formData.thumbnail) {
      newErrors.thumbnail = "Thumbnail image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    const productData = {
      id: product?.id,
      name: formData.name.trim(),
      price: Number(formData.price),
      thumbnail: formData.thumbnail,
      gallery: formData.gallery,
      tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag)
    };

    onSave(productData);
  };

  const handleClose = () => {
    setFormData({
      name: "",
      price: "",
      thumbnail: null,
      gallery: [],
      tags: ""
    });
    setErrors({});
    setThumbnailPreview("");
    setGalleryPreviews([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-lg mb-4">
          {product ? "Edit Product" : "Add New Product"}
        </h3>
        
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text">Product Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
            />
            {errors.name && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.name}</span>
              </label>
            )}
          </div>

          {/* Price */}
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text">Price (Rp)</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className={`input input-bordered w-full ${errors.price ? 'input-error' : ''}`}
            />
            {errors.price && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.price}</span>
              </label>
            )}
          </div>

          {/* Thumbnail Image */}
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text">Thumbnail Image {!product && <span className="text-error">*</span>}</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className={`file-input file-input-bordered w-full ${errors.thumbnail ? 'file-input-error' : ''}`}
            />
            {errors.thumbnail && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.thumbnail}</span>
              </label>
            )}
            {thumbnailPreview && (
              <div className="mt-2">
                <img 
                  src={thumbnailPreview} 
                  alt="Thumbnail Preview" 
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            )}
          </div>

          {/* Gallery Images */}
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text">Gallery Images (up to 5)</span>
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryChange}
              className={`file-input file-input-bordered w-full ${errors.gallery ? 'file-input-error' : ''}`}
            />
            {errors.gallery && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.gallery}</span>
              </label>
            )}
            {galleryPreviews.length > 0 && (
              <div className="mt-2 flex gap-2 flex-wrap">
                {galleryPreviews.map((preview, index) => (
                  <img 
                    key={index}
                    src={preview} 
                    alt={`Gallery Preview ${index + 1}`} 
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="form-control w-full mb-6">
            <label className="label">
              <span className="label-text">Tags (comma-separated)</span>
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g., Premium, Modern, Elegant"
              className="input input-bordered w-full"
            />
            <label className="label">
              <span className="label-text-alt">Separate multiple tags with commas</span>
            </label>
          </div>

          {/* Actions */}
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {product ? "Update" : "Add"} Product
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={handleClose}></div>
    </div>
  );
}
