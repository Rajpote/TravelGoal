import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // For hashing passwords

const UserSchema = new mongoose.Schema(
   {
      fullName: {
         type: String,
         required: [true, "Please add a full name"],
      },
      email: {
         type: String,
         required: [true, "Please add an email"],
         unique: true,
         trim: true,
         match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Please add a valid email address"],
      },
      password: {
         type: String,
         required: [true, "Please add a password"],
         minlength: [8, "Password must be at least 8 characters long"],
      },
      image: {
         type: String,
      },
      isAdmin: {
         type: Boolean,
         default: false,
      },
      likedTravels: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Travel", // Assuming there is a Travel model
         },
      ],
      
   },
   {
      timestamps: true,
   }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
   if (!this.isModified("password")) return next(); // Skip hashing if password is not modified

   try {
      const salt = await bcrypt.genSalt(10); // Generate salt
      this.password = await bcrypt.hash(this.password, salt); // Hash password
      next();
   } catch (error) {
      next(error);
   }
});

// Method to compare passwords
UserSchema.methods.matchPassword = async function (enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password); // Compare password with hashed version
};

// Create a User model
const User = mongoose.model("User", UserSchema);

export default User;
