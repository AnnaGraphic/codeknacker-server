import mongoose, { connect } from "mongoose";
import { User } from "./models/User";

connect('mongodb://localhost:27017/codeknacker', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connect to database');

    const playersData = [
      { username: 'Chun-Li', password: 'S4mpleP4ssword', score: 100, avatar: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Donkey_in_Clovelly%2C_North_Devon%2C_England.jpg", email: "sample1@email.de" },
      { username: 'Lara Croft', password: 'S4mpleP4ssword', score: 95, avatar: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Donkey_in_Clovelly%2C_North_Devon%2C_England.jpg", email: "sample2@email.de" },
      { username: 'Nina', password: 'S4mpleP4ssword', score: 90, avatar: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Donkey_in_Clovelly%2C_North_Devon%2C_England.jpg", email: "sample3@email.de" },
      { username: 'Samus Aran', password: 'S4mpleP4ssword', score: 85, avatar: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Donkey_in_Clovelly%2C_North_Devon%2C_England.jpg", email: "sample4@email.de" },
      { username: 'Mai Shiranui', password: 'S4mpleP4ssword', score: 80, avatar: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Donkey_in_Clovelly%2C_North_Devon%2C_England.jpg", email: "sample5@email.de" },
      { username: 'Kasumi', password: 'S4mpleP4ssword', score: 75, avatar: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Donkey_in_Clovelly%2C_North_Devon%2C_England.jpg", email: "sample6@email.de" },
      { username: 'Cammy White', password: 'S4mpleP4ssword', score: 70, avatar: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Donkey_in_Clovelly%2C_North_Devon%2C_England.jpg", email: "sample7@email.de" },
      { username: 'Mileena', password: 'S4mpleP4ssword', score: 65, avatar: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Donkey_in_Clovelly%2C_North_Devon%2C_England.jpg", email: "sample8@email.de" },
      { username: 'Tifa Lockhart', password: 'S4mpleP4ssword', score: 60, avatar: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Donkey_in_Clovelly%2C_North_Devon%2C_England.jpg", email: "sample9@email.de" },
      { username: 'Cammy', password: 'S4mpleP4ssword', score: 55, avatar: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Donkey_in_Clovelly%2C_North_Devon%2C_England.jpg", email: "sample10@email.de" },
      { username: 'Sarah Bryant', password: 'S4mpleP4ssword', score: 50, avatar: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Donkey_in_Clovelly%2C_North_Devon%2C_England.jpg", email: "sample11@email.de" },
      { username: 'Jean-Claude Van Damme', password: 'S4mpleP4ssword', score: 45, avatar: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Donkey_in_Clovelly%2C_North_Devon%2C_England.jpg", email: "sample12@email.de" },
      { username: 'Yoshimitsu', password: 'S4mpleP4ssword', score: 95, avatar: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Donkey_in_Clovelly%2C_North_Devon%2C_England.jpg", email: "sample13@email.de" }
  ];  

  Promise.all(playersData.map(player => User.create(player)))
    .then(() => {
      console.log('player added successfully');
    })
    .catch(error => {
      console.error('error adding players:', error);
    });
    mongoose.disconnect();
  })
  .catch(error => {
    console.error('connection error with database:', error);
});