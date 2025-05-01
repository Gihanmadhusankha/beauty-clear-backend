import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: { // ✅ fixed typo: "firstNmae" → "firstName"
    type: String,
    required: true,
  },
  lastName: { // ✅ fixed typo: "lasName" → "lastName"
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
    default: "Not given",
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema); // ✅ Changed "users" → "User" (common convention)
export default User;
