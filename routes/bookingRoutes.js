import express from "express";
import {
  changeBookingStatus,
  checkAvailabilityofCar,
  createBooking,
  getOwnerBookings,
  getUserBookings,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/auth.js";

const bookingRouter = express.Router();

// ✅ Fixed route spelling here too
bookingRouter.post('/check-availability', checkAvailabilityofCar);
bookingRouter.post('/create', protect, createBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/owner', protect, getOwnerBookings);
bookingRouter.post('/change-status', protect, changeBookingStatus);

export default bookingRouter;
