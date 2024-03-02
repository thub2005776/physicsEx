const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    name: String,
    grade: String,
    tag: String,
    content: String,
    img: String,
    level: String,
    duration: Number,
});

const TestModel = mongoose.model("tests",TestSchema);

module.exports = TestModel;