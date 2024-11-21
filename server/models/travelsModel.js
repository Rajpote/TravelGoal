import mongoose from "mongoose";

// Define the schema for reviews
const reviewSchema = mongoose.Schema(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      userName: { type: String, required: true },
      userImage: { type: String },
      rating: { type: Number, required: true, min: 0, max: 5 },
      comment: { type: String, required: true },
   },
   {
      timestamps: true,
   }
);

// Define the schema for travels
const travelSchema = mongoose.Schema(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
      name: {
         type: String,
         required: true,
      },
      desc: {
         type: String,
         required: true,
      },
      titleImage: {
         type: String,
         required: true,
      },
      image: {
         type: String,
         required: true,
      },
      category: {
         type: String,
         required: true,
      },
      year: {
         type: Number,
         required: true,
      },
      time: {
         type: Number,
         required: true,
      },
      rate: {
         type: Number,
         required: true,
         default: 0,
         min: 0,
         max: 5,
      },
      numberOfReviews: {
         type: Number,
         required: true,
         default: 0,
      },
      location: {
         type: { type: String, enum: ["Point"], required: false }, 
         coordinates: {
            type: [Number],
            required: false, 
         },
      },

      reviews: [reviewSchema],
      features: { type: [Number], default: [] },
   },
   {
      timestamps: true,
   }
);

// Create the travel model
const Travel = mongoose.model("Travel", travelSchema);

export default Travel;
