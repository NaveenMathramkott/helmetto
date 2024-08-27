import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  photo: {
    type: String,
  },
});

export default mongoose.model("category", categorySchema);
