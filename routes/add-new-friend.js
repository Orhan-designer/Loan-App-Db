const express = require("express");
const router = express.Router();
const User = require("../models/user"); //Можно сразу через User обращаться ко всем методам mongodb

/* Post request for /add-new-friend starts */
router.post("/add-new-friend", async (req, res) => {
  const email = req.body.email; //email пользователя которого хочу добавить
  const id = req.body.id; //мой id 
  console.log("email", email);
  console.log("id", id);
  User.findOne({ email: email }, (err, friend) => {
    if (err) {
      res.status(400).send("Error");
    };
    if (!friend) {
      res.status(200).send("User not found");
    } else {
      User.findOne({ _id: id }, (err, user) => {
        let newFriend = {
          _id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone
        };
        let myFriend = {
          _id: friend.id,
          email: friend.email,
          firstName: friend.firstName,
          lastName: friend.lastName,
          phone: friend.phone
        };
        if (err) {
          res.status(400).send({ error: "Error" });
        } else {
          let addedFriend = user.friends.find((el) => {
            return el.email === friend.email;
          });
          if (addedFriend) {
            res.status(400).send({ error: "Friend already added" });
          } else {
            friend.friends.push(newFriend);
            friend.save();
            user.friends.push(myFriend);
            user.save();
            res.status(200).send({ success: "Friend has been added." });
          };
        };
      });
    };
  });
});
/* Post request for /add-new-friend ends */

module.exports = router;
