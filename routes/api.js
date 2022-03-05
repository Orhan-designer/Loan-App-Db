const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const url =
  "mongodb+srv://Orhan:Mamedov03Danskih09@cluster0.md34d.mongodb.net/LoanAppDb?retryWrites=true&w=majority";
const User = require('../models/user');

mongoose.connect(url, (err, client) => {
  if (err) return console.error(err);

  console.log("Connected to LoanAppDb");
});

router.get("/", (req, res) => {
  res.send("Hello from Api file");
});

function verifyUser(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }

  let user = req.headers.authorization.split(" ")[1];
  if (user === "null") {
    return res.status(401).send("Unauthorized request");
  }

  let payload = jwt.verify(user, "secretKey");
  if (!payload) {
    return res.status(401).send("Unauthorized request");
  }

  req.userId = payload.subject;
  next();
}

//Нужно сделать апи для гост профиля, чтобы добавлялся в базу при отправлении
//его в список друзей
function addGhostFriend(req, res, next) {
  console.log(myId)
  let myId = req.body.id;

  User.find({_id: id}, (err, user) => {
    if (!myId) {
      console.log(myId)
      return console.log(err);
    } else {
      let newUser = {
        firstName: arr[0],
        lastName: arr[1] ? arr[1] : '',
        password: '',
        friends: [],
        email: ''
      };
    }

  })
}

module.exports = router;
