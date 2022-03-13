const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/add-new-friend/ghost-profile", async (req, res) => {
  const currentUserId = req.body.id; //мой айди
  const ghostUserEmail = req.body.email; //емейл Ghost пользователя
  const currentUser = await User.findOne({ _id: currentUserId }).exec(); //объявляю переменную в которой я делаю поиск по своему айди

  if (!currentUser) {
    //проверяю, существует ли мой айди в базе, если нет, то выбрасываю ошибку
    res.status(400).send(`user with this id ${currentUserId} does not exist`);
  }

  /* Создаю нового Ghost пользователя */
  const createdGhostUser = await User.create({
    isGhost: true,
    email: ghostUserEmail,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone
  });

  //добавляю Ghost юзера себе в коллекцию friends
  currentUser.friends.push(createdGhostUser);
  await User.findOneAndUpdate(
    { _id: currentUserId },
    { $set: { friends: currentUser.friends } }
  ).exec();
  res.status(200).send("ghost user was added");
});

module.exports = router;
