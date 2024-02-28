const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    name:String,
    grade: String,
    content: String,
    img: String,
    link: String,
    level: String,
});

const CourseModel = mongoose.model("courses",CourseSchema);

module.exports = CourseModel;