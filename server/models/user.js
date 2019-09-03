const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    _id: String,
    first_name: String,
    last_name: String,
    email: String,
    // phone_number: String,
    // password_hash: String,
    // interests: [String],
    // hobbies: [String],
    // exp: Number,
    // lvl: Number,
    // stats: { funny: Number, intellectual: Number, fun: Number, kind: Number, therapeutic: Number, interesting: Number },
    // chats: [{ chat_id: Number, participants: [{ first_name: String, email: String }] }],
    // events: [{ event_id: String, is_creator: Boolean }]

})

const User = mongoose.model('User', UserSchema)
module.exports = User