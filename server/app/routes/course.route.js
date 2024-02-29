const express = require('express');
const course = require('../controllers/course.controller');

const router = express.Router();

router.route('/')
    .get(course.findAll)
    .post(course.create)

router.route('/:id')
    .get(course.findById)
    .put(course.updateOne)

module.exports = router;