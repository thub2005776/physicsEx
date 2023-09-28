const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    permission: Boolean
});

const UserModel = mongoose.model("project-ct271",UserSchema);

module.exports = UserModel;