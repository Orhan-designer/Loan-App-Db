const express = require("express");
const router = express.Router();
const User = require("../models/user"); //Можно сразу через User обращаться ко всем методам mongodb

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
          let payload = { subject: user._id };
          let token = jwt.sign(payload, "secretKey");
          res.status(200).send({ token });
        }
      }
    }
  });
});
/* Post request for /login ends */
module.exports = router;