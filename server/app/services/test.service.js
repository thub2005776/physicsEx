const { TestModel } = require('../models');

class TestService {
    constructor() {
        this.test = TestModel;
    }

    data(payload) {
        const values = {
            "name": payload.name,
            "grade": payload.grade,
            "tag": payload.tag,
            "content": payload.content,
            "img": payload.img,
            "level": payload.level,
            "duration": payload.duration,
        }
        Object.keys(values).forEach(
            (key) => values[key] === undefined && delete values[key]
        );
        return values;
    }

    async findAll() {
        const result = await this.test.find({});
        return result;
    }

    async findById(id) {
        const result = await this.test.findById(id)
        return result;
    }

    async create(payload) {
        const values = this.data(payload);
        const result = await this.test.create(values);
        return result;
    }

    async updateOne(id, payload) {
        const values = this.data(payload)
        const result = await this.test.findByIdAndUpdate(id, values);
        return result;
    }

    async deleteOne(id) {
        const result = await this.test.findByIdAndDelete(id)
        return result;
    }

    async deleteMany(grade, level, values) {
        const filter = {
            "grade": grade,
            "level": level,
        }
        const result = await this.test.deleteMany(filter, values)
    }

}

module.exports = TestService;