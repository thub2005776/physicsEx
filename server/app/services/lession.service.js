const { LessionModel } = require('../models');

class LessionService {
    constructor() {
        this.lession = LessionModel;
    }

    data(payload) {
        const values = {
            "cid": payload.cid,
            "name": payload.name,
            "link": payload.link,
            "duration": payload.duration,
            "view": payload.view
        }
        Object.keys(values).forEach(
            (key) => values[key] === undefined && delete values[key]
        );
        return values;
    }

    async findAll() {
        const result = await this.lession.find({}).sort({grade : -1});
        return result;
    }

    async findById(id) {
        const result = await this.lession.findById(id)
        return result;
    }

    async create(payload) {
        const values = this.data(payload);
        const result = await this.lession.create(values);
        return result;
    }

    async updateOne(id, payload) {
        const values = this.data(payload)
        const result = await this.lession.findByIdAndUpdate(id, values);
        return result;
    }

    async deleteOne(id) {
        const result = await this.lession.findByIdAndDelete(id)
        return result;
    }

    async deleteMany(grade, level, values) {
        const filter = {
            "grade": grade,
            "level": level,
        }
        const result = await this.lession.deleteMany(filter, values)
    }

}

module.exports = LessionService;