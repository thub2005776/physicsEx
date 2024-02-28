const { ThematicsModel } = require('../models');
const FileService = require('./file.service');

class ThematicsService {
    constructor() {
        this.thematic = ThematicsModel;
    }

    async findAll() {
        const result = await ThematicsModel.find({})
        return result;
    }

    async create(payload) {
        if (payload.file) {
            const fileService = new FileService(payload.file);
            fileService.upload.single('file');
        }
        const values = {
            "code": payload.body.code,
            "thematic": payload.body.thematic,
            "img": payload.file.filename ? payload.file.filename : '',
        }
        const result = await ThematicsModel.create(values)
        return result;
    }

    async update(payload) {
        const oldImg = payload.body.img;
        const code = payload.body.id;
        const values = {
            "code": payload.body.code,
            "thematic": payload.body.thematic,
            "img": payload.file ? payload.file.filename : payload.body.img
        }

        if (payload.file) {
            const fileService = new FileService(payload.file);
            fileService.removeFile(oldImg);
        }

        const result = await ThematicsModel.findOneAndUpdate({ code: code }, values)
        return result;
    }

    async delete(payload) {
        const { code, img } = payload.body;
        const fileService = new FileService();
        fileService.removeFile(img);

        const result = await ThematicsModel.findOneAndDelete({ code: code })
        return result;
    }

}

module.exports = ThematicsService;