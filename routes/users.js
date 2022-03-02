const express = require("express");
const router = express.Router();
const User = require("../models/user"); //Можно сразу через User обращаться ко всем методам mongodb

router.get("/users", (req, res) => {
  User.find({}, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(user);
    }
  });
});

router.get("/users/list", (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log(err);
    } else {
      let list = users.map((el) => {
        return {
          id: el._id,
          name: `${el?.firstName} ${el?.lastName}`,
        };
      });
      res.status(200).send(list);
    }
  });
});

module.exports = router;
