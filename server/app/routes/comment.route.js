const express = require('express');
const comment = require('../controllers/comment.controller');

const router = express.Router();

router.route('/')
    .get(comment.findAll)
    .post(comment.create)

router.route('/:id')
    .post(comment.reply)
    .delete(comment.deleteOne)


router.route('/:uid')
    .delete(comment.deleteMany)

module.exports = router;