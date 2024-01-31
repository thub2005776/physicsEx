const DocsService = require('../services/docs.service');
const ApiError = require('../api-error');

exports.findAll = async (req, res, next) => {
    let document = [];
    try {
        const docsService = new DocsService();
        document = await docsService.findAll();
    } catch (err) {
        return next(
            new ApiError(500, err)
        );
    }
    return res.json(document);
}

exports.create = async (req, res, next) => {
    try {
        const docsService = new DocsService();
        const document = await docsService.create(req);
        return res.json(document);
    } catch (err) {
        return next(
            new ApiError(500, err)
        );
    }
}

exports.update = async (req, res, next) => {
    try {
        const docsService = new DocsService();
        const document = await docsService.update(req);
        return res.json(document);
    } catch (err) {
        return next(
            new ApiError(500, err)
        );
    }
}

exports.deleteOne = async (req, res, next) => {
    try {
        const docsService = new DocsService();
        const document = await docsService.deleteOne(req.body);
        return res.json(document);
    } catch (err) {
        return next(
            new ApiError(500, err)
        );
    }
}