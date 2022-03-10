const mongoose = require('mongoose');

/* Схема создания друзей, которые потом добавляются 
в мой список контактов */
const Schema = mongoose.Schema;
const FriendSchema = new Schema({
    id: Number,
    firstName: String,
    lastName: String,
    email: String,
});

module.exports = mongoose.model('Friend', FriendSchema);