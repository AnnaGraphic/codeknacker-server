
const express = require('express');
const cors = require('cors');
const session = require('express-session');

const app = express();
const port = 3000;

// ----- middleware -----
app.use(express.json());
app.use(cors());
app.use(session({
    secret: 'secret',
    name: 'codeknackerSession',
    resave: true,
    saveUninitialized: true,
  }))

// ----- routes ------
app.post('/api/login', (req, res) => {
  console.log(req.body.username, req.body.password, req.sessi);
  if (req.body.username === 'Harry' && req.body.password === '123') {
    req.session.username = req.body.username;
    req.session.loggedIn = true;
    res.send('ok');
  } else {
    res.status(403).send('forbidden');
  }
});

// TODO: logout route = req.session.destroy();

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});