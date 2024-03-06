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
            "comments": payload.comments,
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
        bcrypt.hash(values.password, salt, async (err, hash) => {
            if (err) return "Error for hassing password ";
            const result = await this.user.create(values)
            return result;
        });
    }

    async createComm(payload) {
        const uid = payload.uid;
        const values = {
            "id": Date().substring(),
            "eid": payload.eid,
            "uid": payload.uid,
            "content": payload.com,
            "time": Date(),
            "state": payload.rep ? true : false,
        }

        const result = await UserModel.findOneAndUpdate({ uid: uid }, { $push: { comments: values } })
        return result;
    }

    async update(payload) {
        // console.log(payload);
        const old = payload.body.old;
        const id = payload.body.id;
        const img = payload.body.file ? payload.body.file :  payload.body.img;

        const values = {
            "name": payload.body.name,
            "email": payload.body.email,
            "img": img,
            "permission": payload.body.permission
        }

        const oldImg = payload.body.img;
        

        if (!old) {
            bcrypt.hash(payload.password, salt, (err, hash) => {
                if (err) return "Error for hassing password";
                values.password = hash;
            });
        } else {
            values.password = payload.body.password;
        }

        const result = await UserModel.findOneAndUpdate({ _id: id }, values)
        return result;
    }

    async delete(payload) {
        const { id, img } = payload;
        
        const result = await UserModel.findOneAndDelete({ _id: id })
        return result;
    }

    
}

module.exports = UsersService;