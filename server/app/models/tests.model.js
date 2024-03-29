const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    name: String,
    grade: String,
    content: String,
    img: String,
    level: String,
    duration: Number,
    enroll: Number,
});

const TestModel = mongoose.model("tests",TestSchema);

module.exports = TestModel;