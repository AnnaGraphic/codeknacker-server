import "./config.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Connect to the database
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Yaay, DB connected");
  } catch (error) {
    console.log("error:", error);
  }
};

connectMongoDB();
