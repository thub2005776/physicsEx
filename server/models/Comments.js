const mongoose = require('mongoose');

const ComSchema = new mongoose.Schema({
    uid: String,
    uimg: String,
    eid: String,
    content: String,
    time: Date,
    state:Boolean,
    reply: Array
});

const ComModel = mongoose.model("comments",ComSchema);

module.exports = ComModel;