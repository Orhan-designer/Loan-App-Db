const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const url =
  "mongodb+srv://Orhan:Mamedov03Danskih09@cluster0.md34d.mongodb.net/LoanAppDb?retryWrites=true&w=majority"; 

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

module.exports = router;
