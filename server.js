// server.js
import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import carRoutes from './routes/carRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("Server is running"));
app.use("/api/user", userRouter); 
app.use("/api/owner",ownerRouter);
app.use("/api/bookings",bookingRouter);
app.use('/api/cars', carRoutes);




// 404 Handler
app.use((req, res) => {
  res.status(404).send(`Route not found: ${req.originalUrl}`);
});

// Connect DB & Start Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
