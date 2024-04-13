const { TestingModel } = require('../models');

class TestingService {
    constructor() {
        this.testing = TestingModel;
    }

    data(payload) {
        const values = {
            'tid': payload.tid,
            'uid': payload.uid,
            'selections': payload.selections,
            'qChecked': payload.qChecked,
            'result': payload.result,
            'time': payload.time,
        }
        Object.keys(values).forEach(
            (key) => values[key] === undefined && delete values[key]
        );
        return values;
    }

    async findAll() {
        const result = await this.testing.find({});
        return result;
    }

    async findById(id) {
        const result = await this.testing.findById(id)
        return result;
    }

    async findOne(tid, uid) {
        const result = await this.testing.findOne({tid: tid, uid: uid})
        return result;
    }

    async findTop() {
        const result = await this.testing.find({}).sort({ enroll: -1 });
        return result;
    }

    async create(payload) {
        const values = this.data(payload);
        const result = await this.testing.findOneAndUpdate({tid: values.tid, uid: values.uid}, values, { upsert: true });
        return result;
    }

    async updateOne(id, payload) {
        const values = this.data(payload)
        const result = await this.testing.findByIdAndUpdate(id, values, { upsert: true });
        return result;
    }

    async addEnroll(id, enroll) {
        const result = await this.testing.findByIdAndUpdate(id, enroll);
        return result;
    }

    async deleteOne(id) {
        const result = await this.testing.findByIdAndDelete(id)
        return result;
    }

    async delete(tid, uid) {
        const filter = {
            "tid": tid,
            "uid": uid,
        }
        const result = await this.testing.deleteMany(filter);
        return result;
    }

}

module.exports = TestingService;