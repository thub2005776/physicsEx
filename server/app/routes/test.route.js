const express = require('express');
const test = require('../controllers/test.controller');

const router = express.Router();

router.route('/')
    .get(test.findAll)
    .post(test.create)

router.route('/:id')
    .get(test.findById)
    .put(test.updateOne)
    .delete(test.deleteOne)

module.exports = router;