const express = require("express");
const router = express.Router();
const Loan = require("../models/loan");

/* Get request for /loans/:id starts */
router.get("/loans/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const loan = await Loan.find({ userId: id }).exec();

    if (!loan) {
      res.status(400).send({ error: "Loan list is empty" });
    }

    res.status(200).send(loan);
  } catch (error) {
    res.status(500).send({ error: "Loan list is crashed" });
  }
});
/* Get request for /loans/:id ends */

/* POST request for /loans/user starts */
router.post("/loans/user", async (req, res) => {
  try {
    const myId = req.body.myId;
    const friendId = req.body.friendId;
    let loan = await Loan.find({
      "secondPerson.id": friendId,
      userId: myId,
    }).exec();

    if (!loan) {
      res.status(400).send("Loan user not be founded");
    }

    res.status(200).send(loan);
  } catch (error) {
    res.status(500).send("Loan user cannot execute request");
  }
});
/* POST request for /loans/user ends */

module.exports = router;
