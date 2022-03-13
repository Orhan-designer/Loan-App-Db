const mongoose = require("mongoose");

/* Схема создания займа, для пользователей, которые потом
добавляются в список должников */
const Schema = mongoose.Schema;
const LoanSchema = new Schema({
  loanName: String,
  firstPerson: Object,
  secondPerson: Object,
  howMuch: Number,
  reason: String,
  userId: String,
  date: Date,
});

module.exports = mongoose.model("loan", LoanSchema, "loans");
