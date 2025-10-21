import { useState, useEffect } from "react";

export default function ProductModal({ isOpen, onClose, onSave, product = null }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    tags: ""
  });

  const [errors, setErrors] = useState({});

  // Populate form when editing
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        image: product.image || "",
        tags: product.tags ? product.tags.join(", ") : ""
      });
    } else {
      setFormData({
        name: "",
        price: "",
        image: "",
        tags: ""
      });
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

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }
    
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = "Please enter a valid price";
    }
    
    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required";
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
      id: product?.id || Date.now(),
      name: formData.name.trim(),
      price: Number(formData.price),
      image: formData.image.trim(),
      tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag)
    };

    onSave(productData);
    onClose();
  };

  const handleClose = () => {
    setFormData({
      name: "",
      price: "",
      image: "",
      tags: ""
    });
    setErrors({});
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

          {/* Image URL */}
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text">Image URL</span>
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL"
              className={`input input-bordered w-full ${errors.image ? 'input-error' : ''}`}
            />
            {errors.image && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.image}</span>
              </label>
            )}
            {formData.image && (
              <div className="mt-2">
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded"
                  onError={(e) => e.target.style.display = 'none'}
                />
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
