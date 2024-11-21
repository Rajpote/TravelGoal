import express from "express";
import * as travelsController from "../controllers/travelsController.js";
import { protect, admin } from "../middlewares/Auth.js";

const router = express.Router();

router.post("/import", travelsController.importTravels);
router.get("/", travelsController.getTravels);
router.get("/:id", travelsController.getTravelById);
router.get("/rated/top", travelsController.getTopRatedTravel);
router.get("/random/all", travelsController.getRandomTravel);

router.post("/:id/reviews", protect, travelsController.createTravelReview);
router.get("/recommendations/:id", protect, travelsController.getRecommendations);

// admin routes
router.put("/:id", protect, admin, travelsController.updateTravel);
router.delete("/:id", protect, admin, travelsController.deleteTravel);
router.delete("/", protect, admin, travelsController.deleteAllTravel);
router.post("/", protect, admin, travelsController.createTravel);

export default router;
