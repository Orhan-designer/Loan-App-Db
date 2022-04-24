const express = require("express");
const router = express.Router();
const userService = require("../service/user-service");
/* Post request for /add-new-friend starts */
router.post("/add-new-friend", async (req, res) => {
  try {
    const friendEmail = req.body.email; //email пользователя которого хочу добавить
    const currentUserId = req.body.id; //мой id

    await userService.addFriend(friendEmail, currentUserId);
    res.status(200).send({ success: "Friend has been added" });
  } catch (error) {
    res
      .status(error.statusCode)
      .send({ error: "You cannot be a friend with yourself" });
  }
});
/* Post request for /add-new-friend ends */

module.exports = router;
