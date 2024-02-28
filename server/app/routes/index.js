const userRouter = require('./user.route');
const thematicRouter = require('./thematic.route');
const exerciseRouter = require('./exercise.route');
const docRouter = require('./doc.route');
const commRouter = require('./comment.route');
const LogRouter = require('./login.route');
const CourseRouter = require('./course.route');
const FileRouter = require('./file.route')

module.exports =  { 
    userRouter, 
    thematicRouter, 
    exerciseRouter, 
    docRouter, 
    commRouter, 
    LogRouter, 
    CourseRouter,
    FileRouter
};