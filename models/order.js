import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
    enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"]
  },
  phoneNumber: {
    type: String,
    required: true
  },
  billItems: {
    type: [
      {
        productId: { type: String, required: true },
        productName: { type: String, required: true },
        image: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 }
      }
    ],
    required: true
  },
  total: {
    type: Number,
    required: true,
    min: 0
  }
}, { timestamps: true }); // ✅ Automatically adds createdAt and updatedAt

const Order = mongoose.model("Order", orderSchema);
export default Order;
