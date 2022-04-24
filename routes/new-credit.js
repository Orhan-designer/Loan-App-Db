const express = require("express");
const router = express.Router();
const Loan = require("../models/loan");
const User = require("../models/user");

/* POST request for /new-credit starts */
router.post("/new-credit", async (req, res) => {
  try {
    const loanData = req.body;
    if (!loanData.secondPerson.id) {
      const arr = loanData.secondPerson.name.split(" ");
      const newUser = {
        firstName: arr[0],
        lastName: arr[1] ? arr[1] : "",
        password: "",
        friends: [],
        email: "",
      };
      const user = await new User(newUser);
      user.save();
    }
    loanData.total = loanData.howMuch;
    const loan = await new Loan(loanData);
    loan.save();

    if (!loan) {
      res.status(400).send({ error: "New credit cannot be founded" });
    }

    res.status(200).send(loan);
  } catch (error) {
    res.status(500).send({ error: "New credit cannot execute request" });
  }
});
/* POST request for /new-credit ends */

module.exports = router;
