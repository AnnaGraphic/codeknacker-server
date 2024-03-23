import "./config.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/User.js";
import { v2 as cloudinary } from "cloudinary";

// ----- config -----
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

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

export const authUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      req.session.username = req.body.username;
      req.session.loggedIn = true;
      console.log('req.session in /login:', req.session);
      res.send("ok");
      next();
    } else {
      res.status(403).send("forbidden");
    }
  } catch (error) {
    console.error();
    res.status(500).json({ error: "Internal server error" });
  }
}

export const registerUser = async (req, res) => {
  // TODO: validate userdata
  const newUser = req.body;
  try {
    const user = await User.create(newUser);
    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const userupdate = async (req, res) => {
  try {
  const result = await cloudinary.uploader.upload(req.file?.path);
  console.log("--------- session data: ", req.session)
  console.log('--------- req.file: ', req.file);
  res.send('ok')
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
};

export const logout = async (req, res) => {
  console.log("logout");
  console.log('req.session in /logout:', req.session);
  try {
    delete req.session.username;
    delete req.session.loggedIn;
    res.send("ok");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
};

// send limit in req? or use default limit?
export const leaderboardData = async (req, res) => {
  try {
    const users = await User.find().sort({ score: -1 }).limit(10).select('username score');;
    console.log(users);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
};

connectMongoDB();
