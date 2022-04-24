const express = require("express");
const router = express.Router();
const User = require("../models/user"); //Можно сразу через User обращаться ко всем методам mongodb
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
/* Post request for /login starts */
router.post("/login", async (req, res) => {
  try {
    const userData = req.body;
    const user = await User.findOne({ email: userData.email }).exec();

    if (!user) {
      res.status(401).send({ error: "Invalid email, please enter a valid email" });
    }
    const isMatch = await bcrypt.compare(userData.password, user.password);

    if (!isMatch) {
      res.status(401).send({ error: "Invalid password, please enter a valid password" });
    }

    const payload = { subject: user._id };
    const token = jwt.sign(payload, "secretKey");
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(500).send("User login cannot execute request");
  }
});
/* Post request for /login ends */
module.exports = router;
