import { getSentimentScore } from "./sentimentAnalysis.js";

export const calculateFeatures = (travel) => {
   const reviewCount = travel.reviews.length;
   const sentimentScore = reviewCount > 0 ? travel.reviews.map((review) => getSentimentScore(review.comment)).reduce((acc, score) => acc + score, 0) / reviewCount : 0;
   const averageRating = reviewCount > 0 ? travel.reviews.reduce((acc, review) => acc + review.rating, 0) / reviewCount : 0;

   return [sentimentScore, reviewCount, averageRating]; // Feature vector
};
