const express = require("express");
const router = express.Router();
const userService = require("../service/user-service");
/* Post request for /add-new-friend starts */
router.post("/add-new-friend", async (req, res) => {
  const friendEmail = req.body.email; //email пользователя которого хочу добавить
  const currentUserId = req.body.id; //мой id

  try {
    await userService.addFriend(friendEmail, currentUserId);
    res.status(200).send({ success: "Friend has been added" });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).send({error: "Friend cannot execute request"});
  }
});
/* Post request for /add-new-friend ends */

module.exports = router;
