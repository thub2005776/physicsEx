const { DocsModel } = require('../models');
const FileService = require('./file.service');

class DocsService {
    constructor() {
        this.doc = DocsModel;
    }

    data(payload) {
        const values = {
            'grade': payload.grade,
            'name': payload.name
        }
        Object.keys(values).forEach(
            (key) => values[key] === undefined && delete values[key]
        );
        return values;
    }

    async findAll() {
        const result = await this.doc.find({})
        return result;
    }

    async create(payload) {
       const values = this.data(payload);
        const result = await this.doc.create(values)
        return result;
    }

    async update(id, payload) {
        const values = this.data(payload);
        const result = await DocsModel.findByIdAndUpdate(id, values);
        return result;
    }

    async deleteOne(id) {
        const result = await DocsModel.findByIdAndDelete(id);
        return result;
    }
}

module.exports = DocsService;