const mongoose = require("mongoose");

/* Схема создания авторизации пользователя */
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    isGhost: Boolean,
    email: String,
    password: String,
    friends: Array,
    firstName: String,
    lastName: String,
    phone: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema, "users");
