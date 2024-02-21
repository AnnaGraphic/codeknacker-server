import "./config.js";
import mongoose from "mongoose";

// Connect to the database
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS_URI);
    console.log("Yaay, DB connected");
  } catch (error) {
    console.log("error:", error);
  }
};

connectMongoDB();
