const mongoose = require('mongoose');

const ComSchema = new mongoose.Schema({
    uid: String,
    eid: String,
    content: String,
    time: Date,
    state:Boolean,
    reply: String
});

const ComModel = mongoose.model("comments",ComSchema);

module.exports = ComModel;