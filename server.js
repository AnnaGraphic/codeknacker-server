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
app.use((req, res, next) => {
  console.log("Session data:", req.session);
  next();
});

// ----- routes ------
app.post("/api/signup", registerUser);

app.post("/api/login", authUser);

app.post("/api/logout", logout)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
