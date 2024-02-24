import "./config.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/User.js";

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

export const authUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      req.session.username = req.body.username;
      req.session.loggedIn = true;
      res.send("ok");
    } else {
      res.status(403).send("forbidden");
    }
  } catch (error) {
    console.error();
    res.status(500).json({ error: "Internal server error" });
  }
}

connectMongoDB();
