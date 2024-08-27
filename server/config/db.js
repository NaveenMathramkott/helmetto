import mongoose from "mongoose";

// MongoDB connection implementation
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connect to ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error occurred while connecting to Mongoose on ${error}`);
  }
};
export default connectDB;
