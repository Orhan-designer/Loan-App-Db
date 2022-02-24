const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const LoanSchema = new Schema({
  loanName: String,
  firstPerson: String,
  secondPerson: String,
  howMuch: Number,
  reason: String,
});

module.exports = mongoose.model("loan", LoanSchema, "loans");
