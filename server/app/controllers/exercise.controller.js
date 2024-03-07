const ExercisesService = require('../services/exercise.service');
const ApiError = require('../api-error');

exports.findAll = async (req, res, next) => {
    let document = [];
    try {
        const exercisesService = new ExercisesService();
        document = await exercisesService.findAll();
    } catch (err) {
        return next(
            new ApiError(500, err)
        );
    }
    return res.json(document);
}

exports.create = async (req, res, next) => {
    try {
        const exercisesService = new ExercisesService();
        const document = await exercisesService.create(req.body);
        return res.json(document);
    } catch (err) {
        return next(
            new ApiError(500, err)
        );
    }
}

exports.update = async (req, res, next) => {
    try {
        const exercisesService = new ExercisesService();
        const document = await exercisesService.update(req.params.id, req.body);
        return res.json(document);
    } catch (err) {
        return next(
            new ApiError(500, err)
        );
    }
}

exports.updateLike = async (req, res, next) => {
    try {
        const exercisesService = new ExercisesService();
        const document = await exercisesService.updateLike(req.params.id, req.body);
        return res.json(document);
    } catch (err) {
        return next(
            new ApiError(500, err)
        );
    }
}

exports.updateMany = async (req, res, next) => {
    try {
        const exercisesService = new ExercisesService();
        const document = await exercisesService.updateMany(req.params.themid, req.body);
        return res.json(document);
    } catch (err) {
        return next(
            new ApiError(500, err)
        );
    }
}

exports.deleteOne = async (req, res, next) => {
    try {
        const exercisesService = new ExercisesService();
        const document = await exercisesService.deleteOne(req.params.id);
        return res.json(document);
    } catch (err) {
        return next(
            new ApiError(500, err)
        );
    }
}

exports.delete = async (req, res, next) => {
    try {
        const exercisesService = new ExercisesService();
        const document = await exercisesService.delete(req);
        return res.json(document);
    } catch (err) {
        return next(
            new ApiError(500, err)
        );
    }
}