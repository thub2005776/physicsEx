const express = require('express');
const course = require('../controllers/course.controller');

const router = express.Router();

router.route('/')
    .get(course.findAll)
    .post(course.create)

module.exports = router;