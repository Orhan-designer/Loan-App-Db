const express = require("express");
const router = express.Router();
const Friend = require("../models/friends"); //Можно сразу через Friend обращаться ко всем методам mongodb
const User = require("../models/user"); //Можно сразу через User обращаться ко всем методам mongodb

router.get("/friends", (req, res) => {
  /* Через Friend обращаемся сразу к методу find({}) */
  Friend.findOne({ email: email }, (err, user) => {
    if (err) {
      return console.log(err);
    }

    res.send(user);
  });
});

router.post("/friends/:id", (req, res) => {
  let id = req.params.id;
  let data = req.body.searchValue.toLowerCase();
  console.log(id);
  User.findOne({ _id: id }, (err, user) => {
    console.log(user);
    if (err) {
      console.log(err);
      res.status(400).send("Error");
    } else {
      console.log(user.friends);
      if (data === "") {
        res.status(200).send(user.friends);
      } else {
        let filteredData = user.friends.filter(
          (el) =>
            el.email.toLowerCase().includes(data) ||
            el.firstName.toLowerCase().includes(data) ||
            el.lastName.toLowerCase().includes(data)
        );
        res.status(200).send(filteredData);
      }
    }
  });
});
/* Get request for /friends/:id ends */

/* Delete request for /add-new-friends/:id starts */
router.delete("/friends/:id", (req, res) => {
  const id = +req.params.id;

  Friend.findOneAndDelete({ id: id }, (err, result) => {
    if (err) {
      return console.log(err);
    }

    let friend = result;
    res.send(friend);
  });
});
/* Delete request for /add-new-friends/:id ends */

module.exports = router;
