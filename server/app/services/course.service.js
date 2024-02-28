const { CourseModel } = require('../models');

class CoursesService {
    constructor() {
        this.course = CourseModel;
    }

    data(payload) {
        const values = {
            "name": payload.name,
            "grade": payload.grade,
            "content": payload.content,
            "img": payload.img,
            "link": payload.link,
            "level": payload.level,
        }
        Object.keys(values).forEach(
            (key) => values[key] === undefined && delete values[key]
        );
        return values;
    }

    async findAll() {
        const result = await this.course.find({});
        return result;
    }

    async findById(id) {
        const result = await this.course.findById(id)
        return result;
    }

    async create(payload) {
        const values = this.data(payload);
        const result = await this.course.create(values);
        return result;
    }

    async updateOne(id, payload) {
        const values = data(payload)
        const result = await this.course.findByIdAndUpdate(id, values)
        return result;
    }

    async deleteOne(id) {
        const result = await this.course.findByIdAndDelete(id)
        return result;
    }

    async deleteMany(grade, level, values) {
        const filter = {
            "grade": grade,
            "level": level,
        }
        const result = await this.course.deleteMany(filter, values)
    }

}

module.exports = CoursesService;