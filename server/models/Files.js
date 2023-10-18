const mongoose = require('mongoose');
const filesSchema = new mongoose.Schema({
    grade: String,
    name: String
});

const FilesModel = mongoose.model("docs",filesSchema);

module.exports = FilesModel;