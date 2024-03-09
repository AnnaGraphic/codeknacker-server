import express from "express";
import cors from "cors";
import session from "express-session";
import { authUser, registerUser, logout } from "./db.js";
import dotenv from "dotenv";

const app = express();
const port = process.env.PORT;

// ----- middleware -----
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET,
    name: "codeknackerSession",
    resave: true,
    saveUninitialized: true,
  })
);

// ----- routes ------
app.post("/api/signup", (req, res) => {
  registerUser(req, res);
});

app.post("/api/login", authUser);
app.use((req, res, next) => {
  console.log("Session data:", req.session);
  next();
});
app.post("/api/logout", logout)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
