const { CommentsModel } = require('../models/models');

class CommentsService {
    constructor() {
        this.comment = CommentsModel;
    }

    async findAll() {
        const result = await CommentsModel.find({})
        return result;
    }

    async create(payload) {
        const id = payload.id;
        const result = '';
        const values = {
            "id": payload.id,
            "uid": payload.uid,
            "uimg": payload.uimg,
            "eid": payload.eid,
            "content": payload.com,
            "time": Date(),
            "state": false,
            "reply": []
        }

        if (!payload.rep) {
            result = await CommentsModel.create(values)

        } else {

            result = await CommentsModel.updateOne(
                { _id: id },
                { $push: { reply: values } }
            )

        }
        return result;
    }

    async update(id) {
        const result = await CommentsModel.findByIdAndUpdate(id, { state: true })
        return result;
    }

    async updateImg(payload) {
        const { uid, img } = payload;
        const result = await CommentsModel.updateMany({ uid: uid }, { uimg: img })
        return result;
    }

    async deleteOne(payload) {
        const time = payload.time;
        const uid = payload.uid;
        const id = payload.id;

        const result = await CommentsModel.findByIdAndDelete(id)
        return result;
    }

    async deleteMany(uid) {
        const result = await CommentsModel.deleteMany({ uid: uid })
        return result;
    }
}
module.exports = CommentsService;