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
    .post(comment.updateImg)

router.route('/:uid')
    .delete(comment.deleteMany)

module.exports = router;