const { UserModel } = require('../models/models');
const FileService = require('./file.serice');
const bcrypt = require('bcrypt');
require('dotenv').config();

class UsersService {
    constructor() {
        this.User = UserModel;
    }

    async findAll() {
        const result = await UserModel.find({})
        return result;
    }

    async findOne(id) {
        const result = await UserModel.findOne({ _id: id })
        return result;
    }

    async create(payload) {
        if (payload.file) {
            const fileService = new FileService(payload.file);
            fileService.upload.single('file');
        }
        const salt = parseInt(process.env.SALT);
        bcrypt.hash(payload.body.password, salt, async (err, hash) => {
            if (err) return "Error for hassing password ";
            const values = {
                "name": payload.body.name,
                "email": payload.body.email,
                "password": hash,
                "permission": payload.body.permission,
                "img": payload.file ? payload.file.filename : payload.body.img,
                "comments": []
            }

            const result = await UserModel.create(values)
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
        const fileService = new FileService(payload.body.file);
        if (payload.body.file && payload.body.file !== "Image.jpg") {
            fileService.upload.single('file');
             fileService.removeFile(oldImg) 
            }

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
        const fileService = new FileService();
        fileService.removeFile(img);
        const result = await UserModel.findOneAndDelete({ _id: id })
        return result;
    }

    
}

module.exports = UsersService;