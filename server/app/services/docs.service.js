const { DocsModel } = require('../models');
const FileService = require('./file.service');

class DocsService {
    constructor() {
        this.exercise = DocsModel;
    }

    async findAll() {
        const result = await DocsModel.find({})
        return result;
    }

    async create(payload) {
        const fileService = new FileService(payload.file);
        fileService.upload.single('file');

        const values = {
            "name": payload.file.filename,
            "grade": payload.body.grade,
        }

        const result = await DocsModel.create(values)
        return result;
    }

    async update(payload) {
        const id = payload.body.id;
        if (payload.file) {
            const fileService = new FileService(payload.file);
            fileService.upload.single('file');
            fileService.removeFile(payload.body.name)
        }

        const values = {
            "name": payload.file.filename,
            "grade": payload.body.grade,
        }

        const result = await DocsModel.findOneAndUpdate({ _id: id }, values)
        return result;
    }

    async deleteOne(payload) {
        const  name = payload;
        const fileService = new FileService();
        fileService.removeFile(name);
        const result = await DocsModel.findOneAndDelete({ name: name })
        return result;
    }
}

module.exports = DocsService;