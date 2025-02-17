import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../pages/styles/Services.css';
import { FiClock, FiPlus } from 'react-icons/fi';
import { FaRupeeSign } from "react-icons/fa";
import Footer from "../components/Footer";

const categories = {
  Hair: ['Hair Spa', 'Hair Cut', 'Hair Wash', 'Hair Styling', 'Hair Coloring', 'Hair Oiling'],
  Packages: ['Basic', 'Premium', 'Luxury'],
  Makeup: ['Bridal Makeup', 'Casual Makeup', 'HD Makeup', 'Party Makeup'],
  Facial: ['Gold Facial', 'Diamond Facial', 'Fruit Facial', 'Anti-Aging Facial', 'Hydrating Facial', 'Pigmentation Facial', 'Acne Facial', 'Brightening Facial'],
  Skin: ['Skin Whitening', 'Acne Treatment', 'Glow Treatment', 'Pigmentation Treatment', 'Anti-Aging Treatment', 'Skin Tightening', 'Skin Rejuvenation', 'Skin Brightening', 'Skin Polishing', 'Skin Detoxification', 'Skin Hydration', 'Skin Nourishment'],
};

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Hair');
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices(selectedCategory);
  }, [selectedCategory]);

  const fetchServices = async (category) => {
    try {
      const response = await axios.get('http://localhost:5000/api/services', {
        params: { category },
      });
      setServices(response.data);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services. Please try again later.');
    }
  };

  const filterBySubcategory = (service) => {
    return selectedSubcategory === 'All' || service.subcategory === selectedSubcategory;
  };

  const addToCart = (service) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item._id === service._id);
      if (existingItem) {
        return prevCart.map(item =>
          item._id === service._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...service, quantity: 1 }];
    });
  };

  const updateQuantity = (serviceId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item._id === serviceId ? { ...item, quantity: newQuantity } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (serviceId) => {
    setCart((prevCart) => prevCart.filter(item => item._id !== serviceId));
  };

  const calculateTotal = () => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = total * 0.2;
    const finalPrice = total - discount;
    return { total, discount, finalPrice };
  };

  return (
    <div className="services-page">
             <div style={{ marginTop: '90px' }}></div>

      <div className="container-fluid">
        <div className="row">
          {/* Left Sidebar - Categories */}
          <div className="col-md-3 col-lg-2 sidebar">
            <div className="sidebar-inner">
              <h4 className="sidebar-title">Categories</h4>
              <div className="category-filter">
                {Object.keys(categories).map((category) => (
                  <button
                    key={category}
                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCategory(category);
                      setSelectedSubcategory('All');
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="subcategory-filter">
                <h5 className="filter-title">Filter by Type</h5>
                <div className="subcategory-grid">
                  <button
                    className={`subcategory-btn ${selectedSubcategory === 'All' ? 'active' : ''}`}
                    onClick={() => setSelectedSubcategory('All')}
                  >
                    All
                  </button>
                  {categories[selectedCategory].map((sub) => (
                    <button
                      key={sub}
                      className={`subcategory-btn ${selectedSubcategory === sub ? 'active' : ''}`}
                      onClick={() => setSelectedSubcategory(sub)}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section - Services List */}
          <div className="col-md-6 col-lg-7 service-list">
            <h2 className="section-title">{selectedCategory} Services</h2>
            <div className="services-grid">
              {services.filter(filterBySubcategory).map((service) => (
                <div key={service._id} className="service-card">
                  <div className="service-image">
                    <img
                      src={`http://localhost:5000${service.image}`}
                      alt={service.name}
                    />
                  </div>
                  <div className="service-details">
                    <h3 className="service-name">{service.name}</h3>
                    <div className="service-description">
                      {service.description.split('. ').map((line, index) => (
                        <p key={index} className="description-line">{line}</p>
                      ))}
                    </div>
                    <div className="service-meta">
                      <div className="price-duration">
                        <span className="price"><FaRupeeSign /> {service.price}</span>
                        <span className="duration"><FiClock /> {service.time} mins</span>
                      </div>
                      <button
                        className="add-to-cart-btn"
                        onClick={() => addToCart(service)}
                      >
                        <FiPlus /> Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Cart */}
          <div className="col-md-3 col-lg-3 cart-sidebar">
            <div className="cart-inner">
              <h4 className="cart-title">Your Cart</h4>
              {cart.length === 0 ? (
                <p className="empty-cart">No services selected</p>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.map((item) => (
                      <div key={item._id} className="cart-item">
                        <div className="item-info">
                          <h6 className="item-name">{item.name}</h6>
                          <p className="item-price">
                            <FaRupeeSign /> {item.price} × {item.quantity}
                          </p>
                        </div>
                        <div className="quantity-controls">
                          <button
                            className="quantity-btn"
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button
                            className="quantity-btn"
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          >
                            +
                          </button>
                          <button
                            className="remove-btn"
                            onClick={() => removeFromCart(item._id)}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="price-summary">
                    <div className="price-row">
                      <span>Subtotal:</span>
                      <span><FaRupeeSign /> {calculateTotal().total.toFixed(2)}</span>
                    </div>
                    <div className="price-row discount">
                      <span>Discount:</span>
                      <span>- <FaRupeeSign /> {calculateTotal().discount.toFixed(2)}</span>
                    </div>
                    <div className="price-row total">
                      <span>Total:</span>
                      <span><FaRupeeSign /> {calculateTotal().finalPrice.toFixed(2)}</span>
                    </div>
                    <button
                      className="checkout-btn"
                      onClick={() => navigate('/book-appointment', { state: { selectedServices: cart } })}
                    >
                      Continue to Booking
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;