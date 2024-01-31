const express = require('express');
const comment = require('../controllers/comment.controller');

const router = express.Router();

router.route('/')
    .get(comment.findAll)
    .post(comment.create)
    .delete(comment.deleteMany)

router.route('/update')
    .patch(comment.update)

router.route('/updateImg')
    .patch(comment.updateImg)

router.route('/:id')
    .delete(comment.deleteOne)

module.exports = router;