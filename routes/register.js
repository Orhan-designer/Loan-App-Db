const express = require("express");
const router = express.Router();
const User = require("../models/user"); //Можно сразу через User обращаться ко всем методам mongodb
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/* Post request for /register starts */
router.post("/register", async (req, res) => {
  try {
    const userData = req.body;
    userData.friends = [];
    const user = await new User(userData);
    user.password = await bcrypt.hash(userData.password, 10);
    user.save();

    if (!user) {
      res.status(400).send({ error: "User not founded" });
    }

    const payload = { subject: user._id };
    const token = jwt.sign(payload, "secretKey");

    res.status(200).send({ token, user });
  } catch (error) {
    res.status(500).send({ error: "Register cannot execute request" });
  }
});
/* Post request for /register ends */

module.exports = router;
