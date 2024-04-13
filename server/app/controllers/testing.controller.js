const TestingService = require('../services/testing.service');
const ApiError = require('../api-error');

exports.findAll = async (req, res, next) => {
    try {
        const testingService = new TestingService();
        const document = await testingService.findAll();
        return res.json(document);
    } catch (err) {
        return next(new ApiError(500, err));
    }
}

exports.findOne = async (req, res, next) => {
    try {
        const testingService = new TestingService();
        const document = await testingService.findOne(req.params.tid, req.params.uid);
        return res.json(document);
    } catch (err) {
        return next(new ApiError(500, err));
    }
}

exports.findById = async (req, res, next) => {
    try {
        const testingService = new TestingService();
        const document = await testingService.findById(req.params.id);
        return res.json(document);
    } catch (err) {
        return next(new ApiError(500, err));
    }
}

exports.create = async (req, res, next) => {
    try {
        const testingService = new TestingService();
        const document = await testingService.create(req.body);
        return res.json(document);
    } catch (err) {
        return next(new ApiError(500, err));
    }
}

exports.addEnroll = async (req, res, next) => {
    try {
        const testingService = new TestingService();
        const document = await testingService.addEnroll(req.params.id, req.body);
        return res.json(document);
    } catch (err) {
        return next(new ApiError(500, err));
    }
}

exports.updateOne = async (req, res, next) => {
    try {
        const testingService = new TestingService();
        const document = await testingService.updateOne(req.params.id, req.body);
        return res.json(document);
    } catch (err) {
        return next(new ApiError(500, err));
    }
}

exports.deleteOne = async (req, res, next) => {
    try {
        const testingService = new TestingService();
        const document = await testingService.deleteOne(req.params.id);
        return res.json(document);
    } catch (err) {
        return next(new ApiError(500, err));
    }
}

exports.enrollTop3 = async (req, res, next) => {
    try {
        const testingService = new TestingService();
        const document = await testingService.findTop();
        return res.json(document.slice(0,3));
    } catch (err) {
        return next(new ApiError(500, err));
    }
}

exports.delete = async (req, res, next) => {
    try {
        const testingService = new TestingService();
        const document = await testingService.delete(req.params.tid, req.params.uid);
        return res.json(document);
    } catch (err) {
        return next(new ApiError(500, err));
    }
}