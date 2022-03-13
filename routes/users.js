const express = require("express");
const router = express.Router();
const User = require("../models/user"); //Можно сразу через User обращаться ко всем методам mongodb

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}).exec();
    if (users.length === 0) {
      res.status(400).send("User not found");
    }
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send("Server cannot be execute request");
  }
});

router.get("/users/list", async (req, res) => {
  try {
    const usersList = await User.find({}).exec();

    if (!usersList) {
      res.status(400).send({ error: "Users not found" });
    }

    let list = usersList.map((el) => {
      return {
        id: el._id,
        name: `${el?.firstName} ${el?.lastName}`,
      };
    });

    res.status(200).send(list);
  } catch (error) {
    return res.status(500).send({ error: "List cannot execute request" });
  }
});

module.exports = router;
