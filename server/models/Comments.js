const mongoose = require('mongoose');

const ComSchema = new mongoose.Schema({
    uid: String,
    eid: String,
    content: String,
    time: Date,
    like: Number,
    dislike: Number,
    reply: Array
});

const ComModel = mongoose.model("comments",ComSchema);

module.exports = ComModel;