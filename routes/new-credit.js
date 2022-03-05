const express = require("express");
const router = express.Router();
const Loan = require("../models/loan");
const User = require("../models/user");

/* POST request for /new-credit starts */
router.post("/new-credit", (req, res) => {
  let loanData = req.body;
  if(!loanData.secondPerson.id) {
    console.log(loanData)
    let arr = loanData.secondPerson.name.split(' ');
    let newUser = {
      firstName: arr[0],
      lastName: arr[1] ? arr[1] : '',
      password: '',
      friends: [],
      email: ''
    };
    console.log(newUser)
    let user = new User(newUser);
    user.save();
  }
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
