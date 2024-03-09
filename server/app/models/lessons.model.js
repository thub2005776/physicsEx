const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
    cid: String,
    name: String,
    duration:Number,
    link:String,
    view: Number,
});

const LessonModel = mongoose.model("lessons",LessonSchema);

module.exports = LessonModel;