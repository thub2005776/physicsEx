const express = require('express');
const exercise = require('../controllers/exercise.controller');

const router = express.Router();

router.route('/')
    .get(exercise.findAll)
    .post(exercise.create)
    .delete(exercise.delete)

router.route('/:id')
    .post(exercise.update)
    .delete(exercise.deleteOne)

router.route('/update/like')
    .patch(exercise.updateLike)

router.route('/update/many/:themid')
    .post(exercise.updateMany)

module.exports = router;