const mongoose = require('mongoose');

const ExSchema = new mongoose.Schema({
    subThematic: String,
    question: String,
    answer: String,
    content: String,
    imageLink:String,
    videoLink: String,
    level: String
});

const ExModel = mongoose.model("exercises",ExSchema);

module.exports = ExModel;