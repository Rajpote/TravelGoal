import express from "express";
import {
   registerUser,
   loginUser,
   updateUserProfile,
   deleteUserProfile,
   changeUserPassword,
   getLikedTravels,
   addLikedTravels,
   deleteLikedTravels,
   getUser,
   deleteUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middlewares/Auth.js";
import { forgotPassword, verifyOTPandResetPassword } from "../controllers/forgotPasswordController.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);

//forgot and verify password routes
router.post('/forgot',forgotPassword)
router.post('/reset',verifyOTPandResetPassword)

router.put("/", protect, updateUserProfile);
router.delete("/", protect, deleteUserProfile);
router.put("/password", protect, changeUserPassword);

router.get("/favorites", protect, getLikedTravels);
router.post("/favorites", protect, addLikedTravels);
router.delete("/favorites", protect, deleteLikedTravels);

// admin routes
router.get("/", protect, admin, getUser);
router.delete("/:id", protect, admin, deleteUser);

export default router;
