import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
    index: true, // optional: speeds up queries
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  altNames: { // ✅ Renamed for better readability (altName → altNames)
    type: [String],
    default: [],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  labelPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  images: {
    type: [String],
    default: [],
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
}, { timestamps: true }); // ✅ Adds createdAt and updatedAt fields automatically

const Product = mongoose.model("Product", productSchema);
export default Product;
