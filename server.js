import express from "express";
import cors from "cors";
import session from "express-session";
import {
  authUser,
  registerUser,
  logout,
  leaderboardData,
  uploadAvatar,
} from "./db.js";
import { upload } from "./middleware/multer.js";
import { createServer } from "http";
import { Server } from "socket.io";

// ----- config -----
const app = express();
const server = createServer(app);
const io = new Server(server);
const port = process.env.PORT;

// ----- middleware -----
app.use(
  cors({
    // express configures the Access-Control-Allow-Origin CORS header
    origin: "*",
    // set to true to pass the header, eg to allow cookies
    credentials: true,
  })
);
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

io.on("connection", (client) => {
  console.log("connected");
  client.on("event", (data) => {
    console.log("data", data);
    io.emit("event", data);
  });
  client.on("disconnect", (data) => {
    console.log("disconnect client");
  });
});

// ----- routes ------
// upload.single('avatar') expects file with name 'avatar' in the request

app.get("/", function (req, res) {
  res.sendFile("index.html", { root: "." });
});

app.put("/api/userupdate", upload.single("avatar"), uploadAvatar);

app.post("/api/signup", registerUser);

app.post("/api/login", authUser);

app.post("/api/logout", logout);

app.get("/api/leaderboard", leaderboardData);

server.listen(3001);
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
