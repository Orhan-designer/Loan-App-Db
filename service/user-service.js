const UserModel = require("../models/user");

class UserService {
  async addFriend(friendEmail, currentUserId) {
    const friend = await UserModel.findOne({ email: friendEmail }).exec();

    if (!friend) {
      const error = new Error();
      error.statusCode = 400;
      error.message = "friend User not found";
      throw error;
    }

    if (friend._id.valueOf() === currentUserId) {
      const error = new Error();
      error.statusCode = 400;
      error.message = "you can not be a friend with yourself";
      throw error;
    }

    const currentUser = await UserModel.findOne({ _id: currentUserId }).exec();
    
    if (!currentUser) {
      const error = new Error();
      error.statusCode = 400;
      error.message = "current User not found";
      throw error;
    }

    if (!this.areBothUsersNotFriendsForEachOfThem(currentUser, friend)) {
      const error = new Error();
      error.statusCode = 400;
      error.message = "Friend already added";
      throw error;
    }

    const newFriendForFriend = {
      _id: currentUser.id,
      email: currentUser.email,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      phone: currentUser.phone,
    };
    friend.friends.push(newFriendForFriend);
    await UserModel.findOneAndUpdate(
      { _id: friend.id },
      { $set: { friends: friend.friends } }
    ).exec();

    const newFriendForCurrentUser = {
      _id: friend.id,
      email: friend.email,
      firstName: friend.firstName,
      lastName: friend.lastName,
      phone: friend.phone,
    };
    currentUser.friends.push(newFriendForCurrentUser);
    await UserModel.findOneAndUpdate(
      { _id: currentUser.id },
      { $set: { friends: currentUser.friends } }
    ).exec();
  }

  areBothUsersNotFriendsForEachOfThem(firstUser, secondUser) {
    const friendOfFirst = firstUser.friends.find((friend) => {
      return friend.email === secondUser.email;
    });
    if (friendOfFirst) {
      return false;
    }

    const friendOfSecond = secondUser.friends.find((friend) => {
      return friend.email === firstUser.email;
    });
    if (friendOfSecond) {
      return false;
    }

    return true;
  }
}

const userService = new UserService();
module.exports = userService;
