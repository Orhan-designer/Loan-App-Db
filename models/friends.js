const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const friendSchema = new Schema({
    id: Number,
    firstName: String,
    lastName: String,
    email: String,
});

module.exports = mongoose.model('friend', friendSchema, 'friends');