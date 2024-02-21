const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// ----- middleware -----
app.use(express.json());
app.use(cors());

// ----- routes ------
app.post("/api/login", (req, res) => {
  console.log(req.body.username, req.body.password);
  //res.status(403).send('forbidden');
  res.send("ok");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
