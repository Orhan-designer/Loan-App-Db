const express = require("express");
const router = express.Router();
const Friend = require("../models/friends"); //Можно сразу через Friend обращаться ко всем методам mongodb
const User = require("../models/user"); //Можно сразу через User обращаться ко всем методам mongodb

router.post("/friends/:id", (req, res) => {
  let id = req.params.id;
  let data = req.body.searchValue.toLowerCase();
  User.findOne({ _id: id }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(400).send("Error");
    } else {
      if (data === "") {
        res.status(200).send(user.friends);
      } else {
        let filteredData = user.friends.filter(
          (el) =>
            el.email.toLowerCase().includes(data) ||
            el.firstName.toLowerCase().includes(data) ||
            el.lastName.toLowerCase().includes(data) ||
            el.phone.toLowerCase().includes(data)
        );
        res.status(200).send(filteredData);
      };
    };
  });
});
/* Get request for /friends/:id ends */

module.exports = router;
