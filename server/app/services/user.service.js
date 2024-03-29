const { UserModel } = require('../models');
const bcrypt = require('bcrypt');
require('dotenv').config();

class UsersService {
    constructor() {
        this.user = UserModel;
    }

    data(payload) {
        const values = {
            "email": payload.email,
            "name": payload.name,
            "password": payload.password,
            "img": payload.img,
            "courses": payload.courses,
            "tests": payload.tests,
            "permission": payload.permission
        }
        Object.keys(values).forEach(
            (key) => values[key] === undefined && delete values[key]
        );
        return values;
    }

    async findAll() {
        const result = await this.user.find({})
        return result;
    }

    async findOne(id) {
        const result = await this.user.findOne({ _id: id })
        return result;
    }

    async create(payload) {
        const values = this.data(payload);
        const salt = parseInt(process.env.SALT);
        const pass = values.password;

        bcrypt.hash(pass, salt, async (err, hash) => {
            if (err) return "Error for hassing password ";
            values.password = hash;
            const result = await this.user.findOneAndUpdate({ email: values.email }, values, { upsert: true })
            return result;

        });
    }

    course(payload) {
        const values = {
            "cid": payload.cid,
            "name": payload.name,
            "time": payload.time,
        }
        Object.keys(values).forEach(
            (key) => values[key] === undefined && delete values[key]
        );
        return values;
    }

    tests(payload) {
        const values = {
            "tid": payload.tid,
            "nanme": payload.name,
            "trueAns": payload.trueAns,
            "time": payload.time,
        }
        Object.keys(values).forEach(
            (key) => values[key] === undefined && delete values[key]
        );
        return values;
    }

    async addCourse(id, payload) {
        const values = this.course(payload);
        const result = await this.user.findByIdAndUpdate(id, { $push: { courses: values } });
        return result;
    }

    async addTest(id, payload) {
        const values = this.tests(payload);
        const result = await this.user.findByIdAndUpdate(id, { $push: { tests: values } });
        return result;
    }

    async update(id, data) {
        const values = this.data(data);
        const old = await this.user.findOne({ password: values.password });
        const salt = parseInt(process.env.SALT);
        const pass = values.password;
        if (old) {
            const result = await this.user.findByIdAndUpdate(id, values);
            return result;
        } else {
            bcrypt.hash(pass, salt, async (err, hash) => {
                if (err) return "Error for hashing password";
                values.password = hash;
                const result = await this.user.findByIdAndUpdate(id, values);
                return result;
            });
        }


    }

    async delete(id) {
        const result = await this.user.findByIdAndDelete(id)
        return result;
    }


}

module.exports = UsersService;