const express = require("express");
const router = express.Router();
const User = require("../models/user"); //Можно сразу через User обращаться ко всем методам mongodb
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
/* Post request for /login starts */
router.post("/login", (req, res) => {
  let userData = req.body;

  User.findOne({ email: userData.email }, async (err, user) => {
    if (err) {
      console.log(err);
    } else {
      if (!user) {
        res.status(401).send({error: "Invalid email"});
      } else {
        const isMatch = await bcrypt.compare(userData.password, user.password)
        if (!isMatch) {
          res.status(401).send({error: "Invalid password"});
        } else {
          let payload = { subject: user._id };
          let token = jwt.sign(payload, "secretKey");
          res.status(200).send({ user, token });
        };
      };
    };
  });
});
/* Post request for /login ends */
module.exports = router;