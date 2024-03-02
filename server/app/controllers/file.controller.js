const ApiError = require('../api-error');
const fs = require('fs');
const QuestionsService = require('../services/question.service');

exports.upload = (req, res, next) => {
    try {
        if (req.file) {
            return res.json("Uploaded")
        } else return next(new ApiError(400, "File is not empty"));

    } catch (err) {
        return next(new ApiError(500, err));
    }
}

exports.uploadJSON = (req, res, next) => {
    try {
        const filePath = '../user/src/assets/' + req.params.json;
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return next(new ApiError(500, err));
            }

            try {
                const jsonData = JSON.parse(data);
                const courseService = new QuestionsService();
                const document = courseService.insertMany(jsonData);
                return res.json(document);
            } catch (err) {
                return next(new ApiError(500, err));
            }
        });
    } catch (err) {
        return next(new ApiError(500, err));
    }
}

exports.remove = (req, res, next) => {
    try {
        if (req.params.img) {
            const filePath = '../user/src/assets/' + req.params.img;
            fs.unlink(filePath, (err) => {
                if (err) { return next(new ApiError(500, err)) }
                return res.json('Removed');
            });
        }

    } catch (err) {
        return next(new ApiError(500, err));
    }
}