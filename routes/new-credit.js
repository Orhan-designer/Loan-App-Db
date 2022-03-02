const express = require("express");
const router = express.Router();
const Loan = require("../models/loan");

/* POST request for /new-credit starts */
router.post("/new-credit", (req, res) => {
  let loanData = req.body;
  let loan = new Loan(loanData);
  loan.save((err, openLoan) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(openLoan);
    }
  });
});
/* POST request for /new-credit ends */

module.exports = router;
