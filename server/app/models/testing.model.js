const mongoose = require('mongoose');

const TestingSchema = new mongoose.Schema({
    tid: String,
    uid: String,
    selections: Array,
    qChecked: Array,
    result: Array,
    time: String,
});

const TestingModel = mongoose.model("testing",TestingSchema);

module.exports = TestingModel;