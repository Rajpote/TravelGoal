import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import asyncHandler from "express-async-handler";

// Function to generate a JWT token
const generateToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d", // Token expiration time
   });
};

// Middleware to protect routes
const protect = asyncHandler(async (req, res, next) => {
   let token;
   console.log("Authorization Header:", req.headers.authorization);

   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      try {
         token = req.headers.authorization.split(" ")[1];

         if (!token) {
            throw new Error("Token not found in the request");
         }

         // Verify the token
         const decoded = jwt.verify(token, process.env.JWT_SECRET);

         // Find the user by ID and attach to request object
         req.user = await UserModel.findById(decoded.id).select("-password");

         if (!req.user) {
            res.status(404);
            throw new Error("User not found");
         }

         next(); // Continue to the next middleware or route handler
      } catch (error) {
         console.error("Token Verification Error:", error); // Log detailed error
         res.status(401).json({ message: "Not authorized, token failed", error: error.message });
      }
   } else {
      res.status(401).json({ message: "Not authorized, no token" });
   }
});

// Middleware to authorize admin-only routes
const admin = (req, res, next) => {
   if (req.user && req.user.isAdmin) {
      next();
   } else {
      res.status(403); // Forbidden
      throw new Error("Not authorized as admin"); // Send an error message
   }
};

export { generateToken, protect, admin };
