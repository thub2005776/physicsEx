const UsersService = require('../services/user.service');
const ApiError = require('../api-error');
require('dotenv').config();

exports.findAll = async (req, res, next) => {
    let document = [];
    try {
        const userService = new UsersService();
        document = await userService.findAll();
    } catch (err) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
    return res.json(document);
}

exports.findOne = async (req, res, next) => {
    if(!req.params?.id) {
        return next(new ApiError(400, "id can not be empty"));
    }

    try {
        const userService = new UsersService();
        const document = await userService.findOne(req.params.id);
        return res.json(document);
    } catch (err) {
        return next(new ApiError(500, err));
    }
}

exports.create = async (req, res, next) => {
    try {
        const userService = new UsersService();
        const document = await userService.create(req.body);
        return res.json(document);
    } catch (err) {
        return next(new ApiError(500, err));
    }

}

exports.createComm = async (req, res, next) => {
    try {
        const userService = new UsersService();
        const document = await userService.createComm(req.body);
        return res.json(document);
    } catch (err) {
        return next(new ApiError(500, err));
    }
}

exports.update = async (req, res, next) => {
    try {
        const userService = new UsersService();
        const document = await userService.update(req.params.id, req.body);
        return res.json(document);
    } catch (err) {
        return next(new ApiError(500, err));
    }
}

exports.delete = async (req, res, next) => {
    try {
        const userService = new UsersService();
        const document = await userService.delete(req.params.id);
        return res.json(document);
    } catch (err) {
        return next(new ApiError(500, err));
    }
}