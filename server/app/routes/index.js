const userRouter = require('./user.route');
const thematicRouter = require('./thematic.route');
const exerciseRouter = require('./exercise.route');
const docRouter = require('./doc.route');
const commRouter = require('./comment.route');
const LogRoter = require('./login.route');

module.exports =  { userRouter, thematicRouter, exerciseRouter, docRouter, commRouter, LogRoter };