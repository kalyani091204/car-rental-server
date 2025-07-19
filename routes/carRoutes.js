// routes/carRoutes.js
import express from 'express';
import Car from '../models/Car.js';

const router = express.Router();

// ✅ Get all available cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find({ isAvailable: true });
    res.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get a car by ID (used in CarDetails.jsx)
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    console.error("Error fetching car by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
