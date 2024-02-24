import express from "express";
import cors from "cors";
import session from "express-session";
import './db.js';
import { authUser, registerUser } from "./db.js";
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

app.post("/api/login", (req, res) => {
  console.log(req.body.username, req.body.password, req.session);
  authUser(req, res);
});

// TODO: logout route = req.session.destroy();

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
