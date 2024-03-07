const ThematicsService = require('../services/thematic.service');
const ApiError = require('../api-error');

exports.findAll = async (req, res, next) => {
    let document = [];
    try {
        const thematicService = new ThematicsService();
        document = await thematicService.findAll();
    } catch (err) {
        return next(
            new ApiError(500, err)
        );
    }
    return res.json(document);
}

exports.create = async (req, res, next) => {
    try {
        const thematicService = new ThematicsService();
        const document = await thematicService.create(req.body);
        return res.json(document)
    } catch (err) {
        return next(
            new ApiError(500, err)
        );
    }
}

exports.update = async (req, res, next) => {
    try {
        const thematicService = new ThematicsService();
        const document = await thematicService.update(req.params.id, req.body);
        return res.json(document)
    } catch (err) {
        return next(
            new ApiError(500, err)
        );
    }
}

exports.delete = async (req, res, next) => {
    try {
        const thematicService = new ThematicsService();
        const document = await thematicService.delete(req.params.id);
        return res.json(document)
    } catch (err) {
        return next(
            new ApiError(500, err)
        );
    }
}