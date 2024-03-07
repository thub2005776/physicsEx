const { ExModel } = require('../models');

class ExercisesService {
    constructor() {
        this.exercise = ExModel;
    }

    data(payload) {
        const values = {
            'themid': payload.themid,
            'subThematic': payload.subThematic,
            'question': payload.question,
            'answer': payload.answer,
            'content': payload.content,
            'no': payload.no,
            'img': payload.img,
            'like': payload.like,
            'dislike': payload.dislike
        }
        Object.keys(values).forEach(
            (key) => values[key] === undefined && delete values[key]
        );
        return values;
    }

    async findAll() {
        const result = await this.exercise.find()
        return result;
    }

    async create(payload) {
        const values = this.data(payload);
        const result = await this.exercise.create(values);
        return result;
    }

    async update(id, payload) {
        const values = this.data(payload);
        const result = await this.exercise.findByIdAndUpdate(id, values)
        return result;
    }

    async updateLike(payload) {
        const { exercise, status } = payload.body;
        const values = {
            "like": exercise.like,
            "dislike": exercise.dislike
        }
        if (status !== ' ') {
            if (status === 'like' || status === 'likeSubDislike') {
                values.like += 1;
            } else if (status === 'dislike' || status === 'dislikeSublike') {
                values.dislike += 1;
            }
        }

        const no = exercise.no;
        const result = await this.exercise.findOneAndUpdate({ no: no }, values)
        return result;
    }

    async updateMany(themid, payload) {
        const subThematic = payload;
        const result = await this.exercise.updateMany({ themid: themid }, subThematic);
        return result;
    }

    async deleteOne(id) {
        const result = await this.exercise.findByIdAndDelete(id);
        return result;
    }

    async delete(payload) {
        const { code, ex } = payload.body;
        const result = await this.exercise.deleteMany({ subThematic: code })
        return result;
    }

}

module.exports = ExercisesService;