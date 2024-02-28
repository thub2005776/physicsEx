const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
    tid: String,
    lid: String,
    question: String,
    answer: Array,
    trueAns: String,
    explain: String,
});

const LessonModel = mongoose.model("questions",LessonSchema);

module.exports = LessonModel;