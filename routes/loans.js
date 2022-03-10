const express = require("express");
const router = express.Router();
const Loan = require("../models/loan");

/* Get request for /loans/:id starts */
router.get("/loans/:id", (req, res) => {
  const id = req.params.id;
  /* Через Loan обращаемся сразу к методу find({}) */
  Loan.find({ userId: id }, (err, loans) => {
    if (err) {
      return console.log(err);
    } else {
      res.send(loans);
    };
  });
});
/* Get request for /loans/:id ends */

/* POST request for /loans/user starts */
router.post("/loans/user", (req, res) => {
  const myId = req.body.myId;
  const friendId = req.body.friendId;
  Loan.find({ "secondPerson.id": friendId, userId: myId }, (err, loans) => {
    if (err) {
      return console.log(err);
    } else {
      res.send(loans);
    };
  });
});
/* POST request for /loans/user ends */

module.exports = router;
