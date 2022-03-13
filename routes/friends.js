const express = require("express");
const router = express.Router();
const User = require("../models/user"); //Можно сразу через User обращаться ко всем методам mongodb

router.post("/friends/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body.searchValue.toLowerCase();
    const user = await User.findOne({ _id: id }).exec();

    if (!user) {
      res.status(400).send({ error: `User not founded by this id: ${user}` });
    }

    if (data === "") {
      return res.status(200).send(user.friends);
    }

    const filteredData = user.friends.filter((el) => {
      return (
        el.email.toLowerCase().includes(data) ||
        el.firstName.toLowerCase().includes(data) ||
        el.lastName.toLowerCase().includes(data) ||
        el.phone.toLowerCase().includes(data)
      );
    });
    res.status(200).send(filteredData);
  } catch (error) {
    res.status(500).send({ error: "User filter cannot execute request" });
  }
});
/* Get request for /friends/:id ends */

module.exports = router;
