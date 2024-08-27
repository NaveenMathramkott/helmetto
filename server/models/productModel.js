import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    offer: {
      type: Number,
    },
    total: {
      type: Number,
      default: 1,
    },
    photo: {
      type: String,
      contentType: String,
    },
    shipping: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("products", productSchema);
