import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/Auth.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
   const { fullName, email, password, image } = req.body;

   try {
      // Check if the user already exists
      const userExists = await UserModel.findOne({ email });
      if (userExists) {
         res.status(400);
         throw new Error("User already exists");
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user
      const user = await UserModel.create({
         fullName,
         email,
         password: hashedPassword,
         image,
      });

      if (user) {
         res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            image: user.image,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
         });
      } else {
         res.status(400);
         throw new Error("Invalid user data");
      }
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

// @desc    Authenticate a user and get a token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   try {
      // Find user by email
      const user = await UserModel.findOne({ email });

      // Check if user exists and password matches
      if (user && (await bcrypt.compare(password, user.password))) {
         res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            image: user.image,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
         });
      } else {
         res.status(401);
         throw new Error("Invalid email or password");
      }
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
   const { fullName, email, image } = req.body;

   try {
      // Find the user by ID (assumed to be in req.user._id from authentication middleware)
      const user = await UserModel.findById(req.user._id);

      if (user) {
         user.fullName = fullName || user.fullName;
         user.email = email || user.email;
         user.image = image || user.image;

         // Save updated user
         const updatedUser = await user.save();

         res.json({
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            image: updatedUser.image,
            isAdmin: user.isAdmin,
            token: generateToken(updatedUser._id), // Generate new token
         });
      } else {
         res.status(404);
         throw new Error("User not found");
      }
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

// @desc    Delete user profile
// @route   DELETE /api/users/profile
// @access  Private
const deleteUserProfile = asyncHandler(async (req, res) => {
   try {
      // Ensure user is authenticated
      if (!req.user) {
         res.status(401);
         throw new Error("Not authorized, no token");
      }

      // Find the user by ID (assumed to be in req.user._id from authentication middleware)
      const user = await UserModel.findById(req.user._id);

      if (user) {
         if (user.isAdmin) {
            res.status(400);
            throw new Error("Admin User cannot be deleted");
         }

         // Delete the user profile
         await UserModel.findByIdAndDelete(req.user._id);
         res.json({ message: "User profile deleted successfully" });
      } else {
         res.status(404);
         throw new Error("User not found");
      }
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

// @desc    Change user password
// @route   PUT /api/users/change-password
// @access  Private
const changeUserPassword = asyncHandler(async (req, res) => {
   const { oldPassword, newPassword } = req.body;

   try {
      // Ensure user is authenticated
      if (!req.user) {
         res.status(401);
         throw new Error("Not authorized, no token");
      }

      // Find the user by ID (assumed to be in req.user._id from authentication middleware)
      const user = await UserModel.findById(req.user._id);

      if (user && (await bcrypt.compare(oldPassword, user.password))) {
         // Hash the new password
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(newPassword, salt);

         // Update the password in the database
         user.password = hashedPassword;
         await user.save();

         res.json({ message: "Password updated successfully" });
      } else {
         res.status(404);
         throw new Error("invalid old password");
      }
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

const getLikedTravels = asyncHandler(async (req, res) => {
   try {
      if (!req.user) {
         res.status(401);
         throw new Error("Not authorized, no token");
      }

      const user = await UserModel.findById(req.user._id).populate("likedTravels");

      if (user) {
         res.status(200).json(user.likedTravels);
      } else {
         res.status(404);
         throw new Error("User not found");
      }
   } catch (error) {
      console.error("Error in getLikedTravels:", error); // Log the error for debugging
      res.status(400).json({ message: error.message });
   }
});

// @desc    Add a travel destination to user's liked list
// @route   POST /api/users/favorites
// @access  Private

const addLikedTravels = asyncHandler(async (req, res) => {
   const { travelId } = req.body; // Get the travelId from the request body
   try {
      if (!req.user) {
         res.status(401);
         throw new Error("Not authorized, no token");
      }

      const user = await UserModel.findById(req.user._id); // Find the logged-in user by ID

      if (user) {
         // const isTravelLiked = user.likedTravels.find((travel) => travel.toString() === travelId);
         if (user.likedTravels.includes(travelId)) {
            res.status(400);
            throw new Error("Travel destination is already liked");
         }
         user.likedTravels.push(travelId);
         await user.save();
         res.json(user.likedTravels);
      } else {
         res.status(404);
         throw new Error("travel not found");
      }
   } catch (error) {
      console.error("Error in addLikedTravels:", error);
      res.status(400).json({ message: error.message });
   }
});

// @desc    Delete all liked travels
// @route   DELETE /api/users/favorites
// @access  Private
const deleteLikedTravels = asyncHandler(async (req, res) => {
   try {
      if (!req.user) {
         res.status(401);
         throw new Error("Not authorized, no token");
      }

      const user = await UserModel.findById(req.user._id);

      if (user) {
         user.likedTravels = []; // Clear the array
         await user.save();

         res.json({
            message: "All favorite travels removed",
            likedTravels: user.likedTravels,
         });
      } else {
         res.status(404);
         throw new Error("User not found");
      }
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

// Admin controller

// @desc    Get user details by ID (admin only)
// @route   GET /api/admin/users/:id
// @access  Private (admin only)
const getUser = asyncHandler(async (req, res) => {
   try {
      // Find the user by ID
      const user = await UserModel.find({}); // Exclude password

      if (user) {
         res.json(user);
      } else {
         res.status(404);
         throw new Error("User not found");
      }
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

// @desc    Delete a user by ID (admin only)
// @route   DELETE /api/admin/users/:id
// @access  Private (admin only)
const deleteUser = asyncHandler(async (req, res) => {
   try {
      // Find the user by ID and delete it
      const user = await UserModel.findById(req.params.id);

      if (user) {
         // Check if the user is an admin
         if (user.isAdmin) {
            res.status(400);
            throw new Error("Admin user cannot be deleted");
         }

         // Delete the user profile
         await UserModel.findByIdAndDelete(req.params.id);
         res.json({ message: "User profile deleted successfully" });
      } else {
         res.status(404);
         throw new Error("User not found");
      }
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});



export { registerUser, loginUser, updateUserProfile, deleteUserProfile, changeUserPassword, getLikedTravels, addLikedTravels, deleteLikedTravels, getUser, deleteUser };
