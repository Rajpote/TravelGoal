//verify OTPsswo'rd
import OTP from "../models/otp.model.js";
import User from "../models/userModel.js";
import { generateOTP, sendOTPEmail } from "../services/otpservice.js";
import bcrypt from "bcryptjs";
const forgotPassword = async (req, res) => {
   try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
         return res.status(404).json({
            success: false,
            message: "User not found",
         });
      }

      const OTPCode = generateOTP(6);

      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await OTP.findOneAndUpdate({ email: email }, { email: email, otp: OTPCode, expiresAt: expiresAt }, { upsert: true });

      const emailSent = await sendOTPEmail(user.email, user.name, OTPCode);
      if (!emailSent) {
         return res.status(500).json({
            success: false,
            message: "Error sending OTP",
         });
      }

      res.status(200).json({
         success: true,
         message: "OTP sent to registered email address",
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         success: false,
         message: "Something went wrong",
      });
   }
};


const verifyOTPandResetPassword = async (req, res) => {
   try {
      const { email, otp, newPassword } = req.body;

      // Find OTP record by email
      const otpRecord = await OTP.findOne({ email });
      if (!otpRecord) {
         return res.status(404).json({
            success: false,
            message: "OTP not found",
         });
      }

      // Check if the OTP is correct and not expired
      if (otpRecord.otp !== otp) {
         return res.status(400).json({
            success: false,
            message: "Invalid OTP",
         });
      }

      if (otpRecord.expiresAt < Date.now()) {
         return res.status(400).json({
            success: false,
            message: "OTP has expired",
         });
      }

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
         return res.status(404).json({
            success: false,
            message: "User not found",
         });
      }

      // Assign plain text password and save (trigger pre-save hook)
      user.password = newPassword;
      await user.save();

      // Remove the OTP record after successful password reset
      await OTP.deleteOne({ email });

      res.status(200).json({
         success: true,
         message: "Password reset successful",
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         success: false,
         message: "Something went wrong",
      });
   }
};


export { forgotPassword, verifyOTPandResetPassword };
