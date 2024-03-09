const express = require('express');
const lession = require('../controllers/lession.controller');

const router = express.Router();

router.route('/')
    .get(lession.findAll)
    .post(lession.create)

router.route('/:id')
    .get(lession.findById)
    .post(lession.updateOne)
    .delete(lession.deleteOne)

module.exports = router;