import express from "express";
import cors from "cors";
import session from "express-session";
import { authUser, registerUser, logout, leaderboardData, userupdate } from "./db.js";
import dotenv from "dotenv";

const app = express();
const port = process.env.PORT;

// ----- middleware -----
app.use(cors({
  // express configures the Access-Control-Allow-Origin CORS header
  origin: 'http://localhost:5173',
  // set to true to pass the header, eg to allow cookies
  credentials: true,
}));
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

app.post("/api/logout", logout);

app.put("/api/userupdate", userupdate);

app.get("/api/leaderboard", leaderboardData);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
