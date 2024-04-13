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

exports.addEnroll = async (req, res, next) => {
    try {
        const courseService = new CoursesService();
        const document = await courseService.addEnroll(req.params.id, req.body);
        return res.json(document);
    } catch (err) {
        return next(new ApiError(500, err));
    }
}

exports.updateOne = async (req, res, next) => {
    try {
        const courseService = new CoursesService();
        const document = await courseService.updateOne(req.params.id, req.body);
        return res.json(document);
    } catch (err) {
        return next(new ApiError(500, err));
    }
}

exports.deleteOne = async (req, res, next) => {
    try {
        const courseService = new CoursesService();
        const document = await courseService.deleteOne(req.params.id);
        return res.json(document);
    } catch (err) {
        return next(new ApiError(500, err));
    }
}

exports.enrollTop3 = async (req, res, next) => {
    try {
        const courseService = new CoursesService();
        const document = await courseService.findTop();
        return res.json(document.slice(0,3));
    } catch (err) {
        return next(new ApiError(500, err));
    }
}