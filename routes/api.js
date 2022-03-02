const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const url =
  "mongodb+srv://Orhan:Mamedov03Danskih09@cluster0.md34d.mongodb.net/LoanAppDb?retryWrites=true&w=majority";

function verifyUser(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }

  let user = req.headers.authorization.split(' ')[1];
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

mongoose.connect(url, (err, client) => {
  if (err) return console.error(err);

  console.log("Connected to LoanAppDb");
});

router.get("/", (req, res) => {
  res.send("Hello from Api file");
});

/* Get request for /add-new-friends starts */
// router.get("/add-new-friends", (req, res) => {
//   /* Через Friend обращаемся сразу к методу find({}) */
//   User.find({}, (err, user) => {
//     if (err) {
//       return console.log(err);
//     };

//     res.send(user);
//   });
// });
/* Get request for /add-new-friends ends */

/* Get request for /add-new-friends/:id starts */
// router.get("/add-new-friends/:id", (req, res) => {
//   const id = +req.params.id;
//   /* Через Friend обращаемся сразу к методу findOne({}) */
//   Friend.findOne({ id: id }, (err, friend) => {
//     if (err) {
//       return console.log(err);
//     };

//     res.send(friend);
//   });
// });
/* Get request for /add-new-friends/:id ends */


module.exports = router;
