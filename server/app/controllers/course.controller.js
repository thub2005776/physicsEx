const CoursesService = require('../services/course.service');
const ApiError = require('../api-error');

exports.findAll = async (req, res, next) => {
    try {
        const courseService = new CoursesService();
        const document = await courseService.findAll();
        return res.json(document);
    } catch (err) {
        return next(new ApiError(500, err));
    }
}

exports.findById = async (req, res, next) => {
    try {
        const courseService = new CoursesService();
        const document = await courseService.findById(req.params.id);
        return res.json(document);
    } catch (err) {
        return next(new ApiError(500, err));
    }
}

exports.create = async (req, res, next) => {
    try {
        const courseService = new CoursesService();
        const document = await courseService.create(req.body);
        return res.json(document);
    } catch (err) {
        return next(new ApiError(500, err));
    }
}