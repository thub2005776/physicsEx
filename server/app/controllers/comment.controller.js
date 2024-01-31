const CommentsService = require('../services/comment.service');
const ApiError = require('../api-error');

exports.findAll = async (req, res, next) => {
    try {
        const commentService = new CommentsService();
        const document = commentService.findAll();
        return res.json(document);
    } catch (err) {
        return next(
            new ApiError(500, err)
        );
    }
}

exports.create = async (req, res, next) => {
    try {
        const commentService = new CommentsService();
        const document = commentService.create(req.body);
        return res.json(document);
    } catch (err) {
        return next(
            new ApiError(500, err)
        );
    }
}

exports.update = async (req, res, next) => {
    try {
        const commentService = new CommentsService();
        const document = commentService.update(req.params.id);
        return res.json(document);
    } catch (err) {
        return next(
            new ApiError(500, err)
        );
    }
}

exports.updateImg = async (req, res, next) => {
    try {
        const commentService = new CommentsService();
        const document = commentService.updateImg(req.body);
        return res.json(document);
    } catch (err) {
        return next(
            new ApiError(500, err)
        );
    }
}

exports.deleteOne = async (req, res, next) => {
    try {
        const commentService = new CommentsService();
        const document = commentService.deleteOne(req.body);
        return res.json(document);
    } catch (err) {
        return next(
            new ApiError(500, err)
        );
    }
}

exports.deleteMany = async (req, res, next) => {
    try {
        const commentService = new CommentsService();
        const document = commentService.deleteMany(req.params.uid);
        return res.json(document);
    } catch (err) {
        return next(
            new ApiError(500, err)
        );
    }
}