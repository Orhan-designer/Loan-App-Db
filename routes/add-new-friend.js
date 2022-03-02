const express = require("express");
const router = express.Router();
const User = require("../models/user"); //Можно сразу через User обращаться ко всем методам mongodb

/* Post request for /add-new-friend starts */
router.post("/add-new-friend", (req, res) => {
  console.log(req.body);
  let email = req.body.email;
  let id = req.body.id;
  console.log("email", email);
  console.log("id", id);
  User.findOne({ email: email }, (err, friend) => {
    console.log("friend before save", friend);
    if (err) {
      console.log(err);
      res.status(400).send("Error");
    }
    if (!friend) {
      res.status(200).send("User not found");
    } else {
      User.findOne({ _id: id }, (err, user) => {
        let newFriend = {
          _id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        };
        let myFriend = {
          _id: friend.id,
          email: friend.email,
          firstName: friend.firstName,
          lastName: friend.lastName,
        };
        console.log("friend after save", friend);
        console.log(user, "user before save");
        if (err) {
          console.log(err);
          res.status(400).send("Error");
        } else {
          let addedFriend = user.friends.find((el) => {
            return el.email === friend.email;
          });
          if (addedFriend) {
            res.status(400).send("Friend already added");
          } else {
            friend.friends.push(newFriend);
            friend.save();
            user.friends.push(myFriend);
            user.save();
            console.log(user, "user after save");
            res.status(200).send("Friend has been added.");
          }
        }
      });
    }
  });
});
/* Post request for /add-new-friend ends */

module.exports = router;