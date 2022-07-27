const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true},
    userName: { type: String, required: true, unique: true},
    points: { type: Number, required: true, unique: false, default: 0},
    posts: { type: Number, required: true, default: 0},
    reacts: { type: Number, required: true, default: 0},
    messages: { type: Number, required: true, default: 0},
    acopoints: { type: Number, required: true, unique: false, default: 0},
    ethWallet: { type: String, required: true, unqiue: false, default: 'None'},
    miner: { type: String, required: true, unqiue: false, default: 'None'},
    twitter: { type: String, required: true, unqiue: false, default: 'Not Shared'},
    instagram: { type: String, required: true, unqiue: false, default: 'Not Shared'}
})

const profileModel = mongoose.model("ProfileModel", profileSchema);

module.exports = profileModel;