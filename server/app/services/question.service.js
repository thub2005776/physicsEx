const { QuestionModel } = require('../models');

class QuestionsService {
    constructor() {
        this.question = QuestionModel;
    }

    data(payload) {
        const values = {
            "tid": payload.tid,
            "question": payload.question,
            "selections": payload.selections,
            "img": payload.img,
            "trueAns": payload.trueAns,
            "explain": payload.explain,
        }
        Object.keys(values).forEach(
            (key) => values[key] === undefined && delete values[key]
        );
        return values;
    }

    async findAll() {
        const result = await this.question.find({});
        return result;
    }

    async findById(id) {
        const result = await this.question.findById(id)
        return result;
    }

    async create(payload) {
        const values = this.data(payload);
        const result = await this.question.create(values);
        return result;
    }

    async insertMany(payload) {
        const result = await this.question.insertMany(payload);
        return result;
    }

    async updateOne(id, payload) {
        const values = this.data(payload)
        const result = await this.question.findByIdAndUpdate(id, values);
        return result;
    }

    async deleteOne(id) {
        const result = await this.question.findByIdAndDelete(id)
        return result;
    }

    async deleteMany(tid) {
        const result = await this.question.deleteMany(tid)
        return result;
    }

}

module.exports = QuestionsService;