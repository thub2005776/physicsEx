const mongoose = require('mongoose');
const docsSchema = new mongoose.Schema({
    grade: String,
    name: String
});

const DocsModel = mongoose.model("docs",docsSchema);

module.exports = DocsModel;