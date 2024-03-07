const { ThematicsModel } = require('../models');
const FileService = require('./file.service');

class ThematicsService {
    constructor() {
        this.thematic = ThematicsModel;
    }

    data(payload) {
        const values = {
            "code": payload.code,
            "thematic": payload.thematic,
            "img": payload.img 
        }
        Object.keys(values).forEach(
            (key) => values[key] === undefined && delete values[key]
        );
        return values;
    }

    async findAll() {
        const result = await this.thematic.find({})
        return result;
    }

    async create(payload) {
        const values = this.data(payload);
        const result = await this.thematic.create(values)
        return result;
    }

    async update(id, payload) {
        const values = this.data(payload);
        const result = await this.thematic.findByIdAndUpdate(id, values);
        return result;
    }

    async delete(id) {
        const result = await this.thematic.findByIdAndDelete(id);
        return result;
    }

}

module.exports = ThematicsService;