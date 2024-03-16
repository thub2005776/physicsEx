const LessionService = require('../services/lession.service');
const ApiError = require('../api-error');

exports.findAll = async (req, res, next) => {
    try {
        const lessionService = new LessionService();
        const document = await lessionService.findAll();
        return res.json(document);
    } catch (err) {
        return next(new ApiError(500, err));
    }
}

exports.findById = async (req, res, next) => {
    try {
        const lessionService = new LessionService();
        const document = await lessionService.findById(req.params.id);
        return res.json(document);
    } catch (err) {
        return next(new ApiError(500, err));
    }
}

exports.create = async (req, res, next) => {
    try {
        const lessionService = new LessionService();
        const document = await lessionService.create(req.body);
        return res.json(document);
    } catch (err) {
        return next(new ApiError(500, err));
    }
}

exports.addView = async (req, res, next) => {
    try {
        const lessionService = new LessionService();
        const document = await lessionService.addView(req.params.id, req.body);
        return res.json(document);
    } catch (err) {
        return next(new ApiError(500, err));
    }
}

exports.updateOne = async (req, res, next) => {
    try {
        const lessionService = new LessionService();
        const document = await lessionService.updateOne(req.params.id, req.body);
        return res.json(document);
    } catch (err) {
        return next(new ApiError(500, err));
    }
}

exports.deleteOne = async (req, res, next) => {
    try {
        const lessionService = new LessionService();
        const document = await lessionService.deleteOne(req.params.id);
        return res.json(document);
    } catch (err) {
        return next(new ApiError(500, err));
    }
}