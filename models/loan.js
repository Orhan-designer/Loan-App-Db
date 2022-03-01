const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const LoanSchema = new Schema({
  loanName: String,
  firstPerson: Object,
  secondPerson: Object,
  howMuch: Number,
  reason: String,
  userId: String,
  date: Date
});

module.exports = mongoose.model("loan", LoanSchema, "loans");
