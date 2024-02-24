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
export const authUser = (req, res) => {
  if (req.body.username === "Nina" && req.body.password === "Rüya2017") {
    req.session.username = req.body.username;
    req.session.loggedIn = true;
    res.send("ok");
  }
  else {
    res.status(403).send("forbidden");
  }
}

connectMongoDB();
