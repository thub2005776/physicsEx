const mongoose = require('mongoose');

const thematicsSchema = new mongoose.Schema({
    code: String,
    thematic: String,
    imgName: String
});

const ThematicsModel = mongoose.model("thematics",thematicsSchema);

module.exports = ThematicsModel;