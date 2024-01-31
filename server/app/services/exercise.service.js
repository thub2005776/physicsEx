const { ExModel } = require('../models/models');
const FileService = require('./file.serice');

class ExercisesService {
    constructor() {
        this.exercise = ExModel;
    }

    async findAll() {
        const result = await ExModel.find()
        return result;
    }

    async create(payload) {
        const fileService = new FileService(payload.file);
        fileService.upload.single('file');
        const values = {
            "subThematic": payload.body.subThematic,
            "no": payload.body.no,
            "question": payload.body.question,
            "answer": payload.body.answer,
            "content": payload.body.content,
            "img": payload.file.filename,
            "like": 0,
            "dislike": 0,
        }

        const result = await ExModel.create(values)
        return result;
    }

    async update(payload) {
        const fileService = new FileService(payload.file);
        fileService.upload.single('file');

        const id = payload.body.id;
        const values = {
            "subThematic": payload.subThematic,
            "no": payload.no,
            "question": payload.question,
            "answer": payload.answer,
            "content": payload.content,
            "img": payload.file ? payload.file.filename : payload.img
        }

        if (payload.file) { fileService.removeFile(payload.img) }

        const result = await ExModel.findOneAndUpdate({ _id: id }, values)
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
        const result = await ExModel.findOneAndUpdate({ no: no }, values)
        return result;
    }

    async updateMany(payload) {
        const { subThematic, code } = payload;
        const result = await ExModel.updateMany({ subThematic: subThematic }, { subThematic: code })
        return result;
    }

    async deleteOne(payload) {
        const { id, img } = payload.body;
        const fileService = new FileService();
        fileService.removeFile(img);
        
        const result = await ExModel.findOneAndDelete({ _id: id })
        return result;
    }

    async delete(payload) {
        const { code, ex } = payload.body;
        const fileService = new FileService();
        ex.forEach(e => {
            fileService.removeFile(e.img);
        });
        const result = await ExModel.deleteMany({ subThematic: code })
        return result;
    }

}

module.exports = ExercisesService;