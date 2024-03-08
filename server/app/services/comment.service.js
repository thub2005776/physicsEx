const { CommentsModel } = require('../models');

class CommentsService {
    constructor() {
        this.comment = CommentsModel;
    }

    data(payload){
        const values = {
            "uid": payload.uid,
            "eid": payload.eid,
            "content": payload.content,
            "time": payload.time,
            "state": payload.state,
            "reply": payload.reply
        }
        Object.keys(values).forEach(
            (key) => values[key] === undefined && delete values[key]
        );
        return values;
    }

    async findAll() {
        const result = await this.comment.find({}).sort({time: -1})
        return result;
    }

    async create(payload) {
        const values = this.data(payload);
        const result = await this.comment.create(values);
        return result;
    }

    async update(id, data) {
        const values = this.data(data);
        const result = await this.comment.findByIdAndUpdate(id, values);
        return result;
    }

    // async updateImg(payload) {
    //     const { uid, img } = payload;
    //     const result = await CommentsModel.updateMany({ uid: uid }, { uimg: img })
    //     return result;
    // }

    async deleteOne(id) {
        const result = await this.comment.findByIdAndDelete(id)
        return result;
    }

    async deleteMany(uid) {
        const result = await this.comment.deleteMany({ uid: uid })
        return result;
    }
}
module.exports = CommentsService;