const express = require('express');
const course = require('../controllers/course.controller');

const router = express.Router();

router.route('/')
    .get(course.findAll)
    .post(course.create)

router.route('/:id')
    .get(course.findById)
    .put(course.updateOne)
    .delete(course.deleteOne)

router.route('/enrolls/top')
    .get(course.enrollTop3)

router.route('/enroll/:id')
    .post(course.addEnroll)

module.exports = router;