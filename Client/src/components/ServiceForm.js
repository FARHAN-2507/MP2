import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceForm = ({ setServices }) => {
  const [services, setLocalServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    subcategory: '',
    time: '',
    price: '',
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // ✅ Subcategory Options
  const subcategories = {
    Hair: ['Hair Spa', 'Hair Cut', 'Hair Wash', 'Hair Styling', 'Hair Coloring', 'Hair Oiling'],
  Packages: ['Basic', 'Premium', 'Luxury'],
  Makeup: ['Bridal Makeup', 'Casual Makeup', 'HD Makeup', 'Party Makeup'],
  Facial: ['Gold Facial', 'Diamond Facial', 'Fruit Facial', 'Anti-Aging Facial', 'Hydrating Facial', 'Pigmentation Facial', 'Acne Facial', 'Brightening Facial'],
  Skin: ['Skin Whitening', 'Acne Treatment', 'Glow Treatment', 'Pigmentation Treatment', 'Anti-Aging Treatment', 'Skin Tightening', 'Skin Rejuvenation', 'Skin Brightening', 'Skin Polishing', 'Skin Detoxification', 'Skin Hydration', 'Skin Nourishment',],
  };

  // ✅ Fetch Services
  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/services');
      setLocalServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ✅ Handle Image Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert description into bullet format
    const formattedDescription = formData.description
      .split('\n')
      .map((point) => point.trim())
      .join('. ');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formattedDescription);
    data.append('category', formData.category);
    data.append('subcategory', formData.subcategory);
    data.append('time', formData.time);
    data.append('price', formData.price);
    data.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/services/add', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Service added successfully');
      setServices((prev) => [...prev, response.data.service]);
      setFormData({
        name: '',
        description: '',
        category: '',
        subcategory: '',
        time: '',
        price: '',
      });
      setImage(null);
      setPreview(null);
      fetchServices();
    } catch (error) {
      console.error('Error adding service:', error);
      // alert('Failed to add service');
    }
  };

  return (
    <div className="container mt-4">
      <div style={{ marginTop: '90px' }}></div>
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white text-center">
          <h3 className="mb-0">Manage Services</h3>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Service Name */}
            <div className="mb-3">
              <label className="form-label fw-bold">Service Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter service name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            {/* Description (Bullet Points) */}
            <div className="mb-3">
              <label className="form-label fw-bold">Description</label>
              <textarea
                className="form-control"
                placeholder="Enter service description (each point in a new line)"
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              ></textarea>
              <small className="text-muted">Each point should be on a new line.</small>
            </div>

            {/* Category */}
            <div className="mb-3">
              <label className="form-label fw-bold">Category</label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => {
                  setFormData({ ...formData, category: e.target.value, subcategory: '' });
                  setSelectedCategory(e.target.value);
                }}
                required
              >
                <option value="">Select a category</option>
                {Object.keys(subcategories).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory (Dynamic) */}
            {selectedCategory && subcategories[selectedCategory] && (
              <div className="mb-3">
                <label className="form-label fw-bold">Subcategory</label>
                <select
                  className="form-select"
                  value={formData.subcategory}
                  onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                  required
                >
                  <option value="">Select a subcategory</option>
                  {subcategories[selectedCategory].map((subcat) => (
                    <option key={subcat} value={subcat}>
                      {subcat}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Time */}
            <div className="mb-3">
              <label className="form-label fw-bold">Time (in minutes)</label>
              <input
                type="number"
                className="form-control"
                placeholder="Duration in minutes"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>

            {/* Price */}
            <div className="mb-3">
              <label className="form-label fw-bold">Price (Rs)</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>

            {/* Image Upload */}
            <div className="mb-3">
              <label className="form-label fw-bold">Upload Image</label>
              <input type="file" className="form-control" onChange={handleImageChange} required />
              {preview && (
                <div className="mt-2">
                  <img src={preview} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-success w-100">
              <i className="bi bi-plus-circle"></i> Add Service
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceForm;
