const express = require("express");
const router = express.Router();
const User = require("../models/user"); //Можно сразу через User обращаться ко всем методам mongodb
const Friend = require("../models/friends"); //Можно сразу через Friend обращаться ко всем методам mongodb
const Loan = require("../models/loan");
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

/* Post request for /register starts */
router.post("/register", (req, res) => {
  let userData = req.body;
  let user = new User(userData);
  user.save((err, registeredUser) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(registeredUser);
    };
  });
});
/* Post request for /register ends */

/* Post request for /login starts */
router.post("/login", (req, res) => {
  let userData = req.body;

  User.findOne({ email: userData.email }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      if (!user) {
        res.status(401).send("Invalid email");
      } else {
        if (user.password !== userData.password) {
          res.status(401).send("Invalid password");
        } else {
          res.status(200).send(user);
        };
      };
    };
  });
});
/* Post request for /login ends */

/* Get request for /add-new-friends starts */
router.get("/add-new-friends", (req, res) => {
  /* Через Friend обращаемся сразу к методу find({}) */
  Friend.find({}, (err, friend) => {
    if (err) {
      return console.log(err);
    };

    res.send(friend);
  });
});
/* Get request for /add-new-friends ends */

/* Get request for /add-new-friends/:id starts */
router.get("/add-new-friends/:id", (req, res) => {
  const id = +req.params.id;
  /* Через Friend обращаемся сразу к методу findOne({}) */
  Friend.findOne({ id: id }, (err, friend) => {
    if (err) {
      return console.log(err);
    };

    res.send(friend);
  });
});
/* Get request for /add-new-friends/:id ends */

/* Post request for /add-new-friends starts */
router.post("/add-new-friends", (req, res) => {
  let friendData = req.body;
  let friend = new Friend(friendData);
  
  friend.save((err, createFriend) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(createFriend);
    };
  });
});
/* Post request for /add-new-friends ends */

/* Delete request for /add-new-friends/:id starts */
router.delete("/add-new-friends/:id", (req, res) => {
  const id = +req.params.id;

  Friend.findOneAndDelete({ id: id }, (err, result) => {
    if (err) {
      return console.log(err);
    };

    let friend = result;
    res.send(friend);
  });
});
/* Delete request for /add-new-friends/:id ends */

/* Put request for /add-new-friends starts */
router.put("/add-new-friends", (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const id = req.body.id;
  const fullName = req.body.fullName;
  const email = req.body.email;
  const address = req.body.address;
  const city = req.body.city;
  const phone = req.body.phone;
  const gender = req.body.gender;

  Friend.findOneAndUpdate(
    { id: id },
    {
      $set: {
        id: id,
        fullName: fullName,
        email: email,
        address: address,
        city: city,
        phone: phone,
        gender: gender,
      },
    },
    { returnDocument: "after", new: true },
    (err, result) => {
      if (err) {
        return console.log(err);
      }

      const friend = result.value;
      res.send(friend);
    }
  );
});
/* Put request for /add-new-friends ends */

/* Get request for /new-credit starts */
router.get("/new-credit", (req, res) => {
  /* Через Friend обращаемся сразу к методу find({}) */
  Loan.find({}, (err, loan) => {
    if (err) {
      return console.log(err);
    };

    res.send(loan);
  });
});
/* GET request for /new-credit ends */

/* POST request for /new-credit starts */
router.post("/new-credit", (req, res) => {
  let loanData = req.body;
  let loan = new Loan(loanData);
  loan.save((err, openLoan) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(openLoan);
    };
  });
});
/* POST request for /new-credit ends */

module.exports = router;
