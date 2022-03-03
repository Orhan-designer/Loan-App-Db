const express = require("express");
const router = express.Router();
const User = require("../models/user"); //Можно сразу через User обращаться ко всем методам mongodb
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

/* Post request for /register starts */
router.post("/register", async (req, res) => {
  let userData = req.body;
  userData.friends = [];
  let user = new User(userData);
  user.password = await bcrypt.hash(userData.password, 10);
  user.save((err, registeredUser) => {
    if (err) {
      console.log(err);
    } else {
      let payload = { subject: registeredUser._id };
      let token = jwt.sign(payload, "secretKey");
      res.status(200).send({token, user});
    }
  });
});
/* Post request for /register ends */

module.exports = router;