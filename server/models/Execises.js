const mongoose = require('mongoose');

const ExSchema = new mongoose.Schema({
    subThematic: String,
    question: String,
    answer: String,
    content: String,
    no: String,
    like: Number,
    dislike: Number
});

const ExModel = mongoose.model("exercises",ExSchema);

module.exports = ExModel;