const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
    cid: String,
    content: String,
    duration:Number,
    videoURL:String,
    view: Number,
});

const LessonModel = mongoose.model("lessons",LessonSchema);

module.exports = LessonModel;