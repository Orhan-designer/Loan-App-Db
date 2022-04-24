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

router.post("/repay", async (req, res) => {
  try {
    const id = req.body.id;
    const sum = req.body.sum;
    let loan = await Loan.findOne({
      _id: id,
    }).exec();
    console.log(loan);
    if (!loan) {
      res.status(400).send("Loan user not be founded");
    }
    loan.history.push(`+${sum}`);
    loan.total = +loan.total + sum;
    if (+loan.total >= 0) {
      loan.howMuch = +loan.howMuch * -1;
    }
    loan.save();
    res.status(200).send({ status: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Loan user cannot execute request");
  }
});
/* POST request for /loans/user ends */

module.exports = router;
