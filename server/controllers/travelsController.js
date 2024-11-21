import { TravelData } from "../Data/travelData.js";
import Travel from "../models/travelsModel.js";
import asyncHandler from "express-async-handler";
import { cosineSimilarity } from "../utils/cosineSimilarity.js";
import UserModel from "../models/userModel.js";
import { calculateFeatures } from "../utils/calculateFeatures.js";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

// @desc Import Travels
// @route POST /api/travel/import
// @access Public
const importTravels = asyncHandler(async (req, res) => {
   try {
      // Delete all existing travel documents
      await Travel.deleteMany({});

      // Insert new travel documents from TravelData
      const travels = await Travel.insertMany(TravelData);

      // Respond with the inserted documents
      res.status(201).json({
         message: "Travels imported successfully",
         data: travels,
      });
   } catch (error) {
      // Respond with error message if something goes wrong
      res.status(500).json({
         message: "Failed to import travels",
         error: error.message,
      });
   }
});

// @desc get all Travels
// @route GET /api/travel
// @access Public
const getTravels = asyncHandler(async (req, res) => {
   try {
      const { category, time, rate, year, search } = req.query;

      // Base query for category, time, rate, year, and search
      let query = {
         ...(category && { category }),
         ...(time && { time }),
         ...(rate && { rate }),
         ...(year && { year }),
         ...(search && { name: { $regex: search, $options: "i" } }),
      };

      const page = Number(req.query.pageNumber) || 1;
      const limit = 10;
      const skip = (page - 1) * limit;

      // Fetch travels without location-based filtering
      const travels = await Travel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);

      const count = await Travel.countDocuments(query);

      res.json({
         travels,
         page,
         pages: Math.ceil(count / limit),
         totalTravels: count,
      });
   } catch (error) {
      res.status(400).json({ message: "Server Error", error: error.message });
   }
});

// @desc get Travels by id
// @route GET /api/travel/:id
// @access Public
const getTravelById = asyncHandler(async (req, res) => {
   try {
      const travel = await Travel.findById(req.params.id);
      if (travel) {
         res.json(travel);
      } else {
         res.status(404);
         throw new Error("Travel not found");
      }
   } catch (error) {
      // Handle any errors that occurred during the fetch
      res.status(400).json({ message: "Server Error", error: error.message });
   }
});

// @desc get top rated travel
// @route GET /api/travel/rated/top
// @access Public
const getTopRatedTravel = asyncHandler(async (req, res) => {
   try {
      const travels = await Travel.find({}).sort({ rate: -1 });
      res.json(travels);
   } catch (error) {
      // Handle any errors that occurred during the fetch
      res.status(400).json({ message: "Server Error", error: error.message });
   }
});

// @desc get random travel
// @route GET /api/travel/random/all
// @access Public
const getRandomTravel = asyncHandler(async (req, res) => {
   try {
      const travels = await Travel.aggregate([{ $sample: { size: 8 } }]);
      res.json(travels);
   } catch (error) {
      // Handle any errors that occurred during the fetch
      res.status(400).json({ message: "Server Error", error: error.message });
   }
});

// PRIVATE CONTROLLERS

// @desc create travel review
// @route POST /api/travel/:id/reviews
// @access Public
const createTravelReview = asyncHandler(async (req, res) => {
   const { rating, comment } = req.body;
   try {
      const travels = await Travel.findById(req.params.id);
      if (travels) {
         const alreadyReviewed = travels.reviews.find((r) => r.userId.toString() === req.user._id.toString());
         if (alreadyReviewed) {
            res.status(400);
            throw new Error("you already reviewed this travel destination");
         }
         const review = {
            userName: req.user.fullName,
            userId: req.user._id,
            userImage: req.user.image,
            rating: Number(rating),
            comment,
         };
         travels.reviews.push(review);
         travels.numberOfReviews = travels.reviews.length;

         // calculate new review
         travels.rate = travels.reviews.reduce((acc, item) => item.rating + acc, 0) / travels.reviews.length;
         await travels.save();
         res.status(201).json({
            message: "Review added",
         });
      } else {
         res.status(404);
         throw new Error("travel not found");
      }
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

// ADMIN CONTROLLERS

// @desc Delete travel
// @route DELETE /api/travel/:id
// @access Private/Admin
const deleteTravel = asyncHandler(async (req, res) => {
   try {
      const { id } = req.params;

      // Find and delete the travel by ID
      const travel = await Travel.findByIdAndDelete(id);
      if (travel) {
         res.status(200).json({ message: "Travel removed" });
      } else {
         res.status(404);
         throw new Error("Travel not found");
      }
   } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
   }
});

// @desc Delete all travel
// @route DELETE /api/travel/:id
// @access Private/Admin
const deleteAllTravel = asyncHandler(async (req, res) => {
   try {
      await Travel.deleteMany({});
      res.json({ message: "all travel destination deleted" });
   } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
   }
});

// @desc create travel
// @route POST /api/travel
// @access Private/Admin
const createTravel = asyncHandler(async (req, res) => {
   try {
      const { name, desc, image, titleImage, category, year, time, rate, numberOfReviews, latitude, longitude } = req.body;

      // Create new Travel object
      const travel = new Travel({
         name,
         desc,
         image,
         titleImage,
         category,
         year,
         time,
         rate,
         numberOfReviews,
         location: {
            type: "Point",
            coordinates: [longitude, latitude], // Save as [longitude, latitude]
         },
         userId: req.user._id,
      });

      // Calculate features (e.g., sentiment score, average rating) and attach them to the travel object
      travel.features = calculateFeatures(travel);

      // Save travel to the database
      if (travel) {
         const createdTravel = await travel.save();
         res.status(201).json(createdTravel);
      } else {
         res.status(400);
         throw new Error("Invalid travel data");
      }
   } catch (error) {
      // Handle any errors that occurred during the process
      res.status(400).json({ message: "Server Error", error: error.message });
   }
});

// @desc Update travel
// @route PUT /api/travel/:id
// @access Private/Admin
const updateTravel = asyncHandler(async (req, res) => {
   try {
      const {
         name,
         desc,
         image,
         titleImage,
         category,
         year,
         time,
         rate,
         numberOfReviews, // Added to match the example data
         latitude, // Extract latitude from req.body
         longitude,
      } = req.body;
      console.log("Request Body:", req.body); // Check incoming data
      const travel = await Travel.findById(req.params.id);
      if (travel) {
         travel.name = name || travel.name;
         travel.desc = desc || travel.desc;
         travel.image = image || travel.image;
         travel.titleImage = titleImage || travel.titleImage;
         travel.category = category || travel.category;
         travel.features = calculateFeatures(travel); // Recalculate features
         travel.year = year || travel.year;
         travel.rate = rate || travel.rate;
         travel.time = time || travel.time;
         travel.numberOfReviews = numberOfReviews || travel.numberOfReviews;
         if (latitude && longitude) {
            travel.location = {
               type: "Point",
               coordinates: [parseFloat(longitude), parseFloat(latitude)], 
            };
         }

         travel.features = calculateFeatures(travel);

         const updatedTravel = await travel.save();
         res.status(201).json(updatedTravel);
      } else {
         res.status(404);
         throw new Error("travel not found");
      }
   } catch (error) {
      // Handle any errors that occurred during the fetch
      res.status(400).json({ message: "Server Error", error: error.message });
   }
});

// @desc Update travel
// @route GET /api/recommendation/:id
// @access Private/Admin
const getRecommendations = asyncHandler(async (req, res) => {
   const { id } = req.params;
   if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
   }

   const user = await UserModel.findById(id).populate("likedTravels");
   if (!user) {
      return res.status(404).json({ message: "User not found" });
   }

   const allTravels = await Travel.find();
   const likedTravelsFeatures = user.likedTravels.map((travel) => travel.features);

   let travelRecommendations;

   // If user has liked travels, recommend based on similarity
   if (likedTravelsFeatures.length > 0) {
      travelRecommendations = allTravels
         .map((travel) => {
            const similarityScore = likedTravelsFeatures.reduce((acc, likedFeatures) => {
               const score = cosineSimilarity(likedFeatures, travel.features);
               return acc + score;
            }, 0);
            return { ...travel.toObject(), similarityScore };
         })
         .filter((travel) => travel.similarityScore > 0)
         .sort((a, b) => b.similarityScore - a.similarityScore);
   }
   // If no liked travels, recommend based on top reviews or ratings
   else {
      travelRecommendations = allTravels
         .map((travel) => {
            const { reviewCount, averageRating } = travel.features;
            return { ...travel.toObject(), reviewCount, averageRating };
         })
         .sort((a, b) => b.averageRating - a.averageRating || b.reviewCount - a.reviewCount);
   }

   res.json(travelRecommendations);
});

export { importTravels, getTravels, getTravelById, getTopRatedTravel, getRandomTravel, createTravelReview, updateTravel, deleteTravel, deleteAllTravel, createTravel, getRecommendations };
