import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Car from "../models/Car.js";

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET);
};

// Register
export const registerUser = async (req, res) => {
  console.log("Register API Hit ✅");
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password || password.length < 8) {
      return res.json({
        success: false,
        message: "All fields required. Password must be 8+ characters.",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = generateToken(user._id.toString());
    res.json({ success: true, token });
  } catch (error) {
    console.log("Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  console.log("Login API Hit ✅");
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user._id.toString());
    res.json({ success: true, token });
  } catch (error) {
    console.log("Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

//  Get user data
export const getUserData = async (req, res) => {
  try {
    const { user } = req;
    res.json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


//Get All Cars for the Frontend

export const getCars = async (req, res) => {
  try {
    const cars = await Car.find({isAvaliable : true})
     res.json({ success: true, cars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
