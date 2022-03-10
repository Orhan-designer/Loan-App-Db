const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/add-new-friend/ghost-profile", (req, res) => {
  const email = req.body.email; //email пользователя которого хочу добавить
  const id = req.body.id; //мой id
  console.log("Email", email);
  console.log("id", id);

  const newGhostUser = new User({
    email: req.body.email,
  });
  //перехватываем ошибку, если она возникает

  User.findOne({ email: email }, async (err, friend) => {
    if (err) {
      res.status(400).send({ error: err });
    } else {
      let addGhostFriend = friend.friends.find((el) => {
        el.email === friend.email;
      });
      if (addGhostFriend) {
        friend.push(newGhostUser);
        friend.save();
      }
    }

    try {
      const user = await newGhostUser;
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
    }
  });
});

module.exports = router;
