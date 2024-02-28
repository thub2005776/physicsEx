const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    name: String,
    cid: String,
    content: String,
    img: String,
    level: String,
    times: Number,
});

const TestModel = mongoose.model("tests",TestSchema);

module.exports = TestModel;