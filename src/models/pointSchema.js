const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
    messageID: { type: String, require: true, unique: true},
    messageCreator: { type: String, required: true, unique: false},
    userID: { type: String, required: true, default: "N/A"},
    reacts: { type: Number, required: true, default: 0},
})

const pointModel = mongoose.model("PointModel", pointSchema);

module.exports = pointModel;