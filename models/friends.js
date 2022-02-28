const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const friendSchema = new Schema({
    id: Number, /* под вопросом, не понятно нужно ли или нет */
    fullName: String,
    email: String,
    city: String,
    phone: Number,
});

module.exports = mongoose.model('friend', friendSchema, 'friends');