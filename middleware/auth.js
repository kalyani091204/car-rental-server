import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  // ✅ Remove Bearer prefix if present
  if (token && token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  if (!token) {
    return res.json({ success: false, message: "Not authorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.userId) {
      return res.json({ success: false, message: "Invalid token" });
    }

    req.user = await User.findById(decoded.userId).select("-password");

    if (!req.user) {
      return res.json({ success: false, message: "User not found" });
    }

    next();
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: "Not authorized, token invalid" });
  }
};
