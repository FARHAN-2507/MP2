const mongoose = require('mongoose');

// Categories and their corresponding subcategories
const categories = {
  Hair: ['Hair Spa', 'Hair Cut', 'Hair Wash', 'Hair Styling', 'Hair Coloring', 'Hair Oiling'],
  Packages: ['Basic', 'Premium', 'Luxury'],
  Makeup: ['Bridal Makeup', 'Casual Makeup', 'HD Makeup', 'Party Makeup'],
  Facial: ['Gold Facial', 'Diamond Facial', 'Fruit Facial', 'Anti-Aging Facial', 'Hydrating Facial', 'Pigmentation Facial', 'Acne Facial', 'Brightening Facial'],
  Skin: ['Skin Whitening', 'Acne Treatment', 'Glow Treatment', 'Pigmentation Treatment', 'Anti-Aging Treatment', 'Skin Tightening', 'Skin Rejuvenation', 'Skin Brightening', 'Skin Polishing', 'Skin Detoxification', 'Skin Hydration', 'Skin Nourishment',],
};

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: Object.keys(categories),
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  time: {
    type: Number, // Duration in minutes
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // Store image URL or path
    required: true,
  },
});

// Export the model
module.exports = mongoose.model('Service', serviceSchema);
