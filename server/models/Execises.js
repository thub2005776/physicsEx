const mongoose = require('mongoose');

const ExSchema = new mongoose.Schema({
    name: String,
    exercise: Array
});

const ExModel = mongoose.model("exercises",ExSchema);

module.exports = ExModel;