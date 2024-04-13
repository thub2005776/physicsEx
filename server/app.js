const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const ApiError = require('./app/api-error');

require('dotenv').config();

const { userRouter, 
    thematicRouter, 
    exerciseRouter, 
    docRouter, 
    commRouter, 
    LogRouter, 
    CourseRouter, 
    FileRouter, 
    TestRouter,
    QuestionRouter,
    LessionRouter,
    TestingRouter
}   = require('./app/routes');

const app = express();
app.use(cors({
    origin: [process.env.REACT_APP_URL, process.env.REACT_APP_ADMIN_URL, "http://localhost"],
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    credentials: true,
    preflightContinue: true,
    optionsSuccessStatus: 200
  }));
app.use(express.json());
app.use(express.static("./app/assets/"));

app.use(cookieParser());

app.use('/users', userRouter);

app.use('/thematics', thematicRouter);

app.use('/exercises', exerciseRouter);

app.use('/docs', docRouter);

app.use('/comments', commRouter);

app.use('/courses', CourseRouter);

app.use('/lessions', LessionRouter);

app.use('/tests', TestRouter);

app.use('/questions', QuestionRouter);

app.use('/testing', TestingRouter);

app.use('/log', LogRouter);

app.use('/file', FileRouter);


// handle 404 response 
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;