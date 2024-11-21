import Categories from "../models/categoriesModel.js";
import asyncHandler from "express-async-handler";

// @desc get all categories
// @route GET /api/travel
// @access Public
const getCategory = asyncHandler(async (req, res) => {
   try {
      const categories = await Categories.find({});
      res.status(200).json(categories);
   } catch (error) {
      // Handle any errors that occurred during the fetch
      res.status(400).json({ message: "Server Error", error: error.message });
   }
});

// ADMIN CONTROLLERS

// @desc create new category
// @route POST /api/categories
// @access Private/Admin
const createCategory = asyncHandler(async (req, res) => {
   try {
      const { title } = req.body;
      const category = new Categories({
         title,
      });
      const createdCategory = await category.save();

      res.status(201).json(createdCategory);
   } catch (error) {
      // Handle any errors that occurred during the fetch
      res.status(400).json({ message: "Server Error", error: error.message });
   }
});

// @desc update category
// @route PUT /api/categories/:id
// @access Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
   try {
      const category = await Categories.findById(req.params.id);

      if (category) {
         category.title = req.body.title || category.title;
         const updatedCategory = await category.save();
         res.status(200).json(updatedCategory);
      } else {
         res.status(404).json({ message: "Categories not found" });
      }
   } catch (error) {
      // Handle any errors that occurred during the fetch
      res.status(400).json({ message: "Server Error", error: error.message });
   }
});

// @desc delete category
// @route DELETE /api/categories/:id
// @access Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
   try {
      const { id } = req.params;

      // Use findByIdAndDelete to find and delete the category
      const deletedCategory = await Categories.findByIdAndDelete(id);

      if (deletedCategory) {
         res.status(200).json({ message: "Category removed" });
      } else {
         res.status(404).json({ message: "Category not found" });
      }
   } catch (error) {
      // Handle any errors that occurred during the fetch
      res.status(500).json({ message: "Server Error", error: error.message });
   }
});

export { getCategory, createCategory, updateCategory, deleteCategory };
