const express = require('express');
const Service = require('../models/Service');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/** 
 * 📌 Add a new service 
 * 🔹 Requires: name, description, category, subcategory, time, price, image
 */
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, description, category, subcategory, time, price } = req.body;

    if (!name || !description || !category || !subcategory || !time || !price || !req.file) {
      return res.status(400).json({ message: 'All fields are required, including the image.' });
    }

    const service = new Service({
      name,
      description,
      category,
      subcategory,
      time,
      price,
      image: `/uploads/${req.file.filename}`, // Save the image path
    });

    await service.save();
    res.status(201).json({ message: 'Service added successfully', service });
  } catch (error) {
    console.error('Error adding service:', error);
    res.status(500).json({ message: 'Failed to add service', error });
  }
});

/** 
 * 📌 Get services with optional category & subcategory filters
 * 🔹 Example: `/api/services?category=Hair&subcategory=Hair Cut`
 */
router.get('/', async (req, res) => {
  const { category, subcategory } = req.query;

  try {
    let query = {};
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;

    const services = await Service.find(query);
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Error fetching services', error });
  }
});

/** 
 * 📌 Update a service by ID 
 * 🔹 Updates: name, description, category, subcategory, time, price
 */
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, category, subcategory, time, price } = req.body;

  try {
    const service = await Service.findByIdAndUpdate(
      id,
      { name, description, category, subcategory, time, price },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error updating service', error });
  }
});

/** 
 * 📌 Delete a service by ID
 */
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service', error });
  }
});

module.exports = router;
