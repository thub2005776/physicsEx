const express = require('express');
const question = require('../controllers/question.controller');

const router = express.Router();

router.route('/')
    .get(question.findAll)
    .post(question.create)

router.route('/:id')
    .get(question.findById)
    .put(question.updateOne)
    .delete(question.deleteOne)

router.route('/:tid')
    .delete(question.deleteMany)
    
module.exports = router;