const express = require('express');
const users = require('../controllers/user.controller');

const router = express.Router();

router.route('/')
    .get(users.findAll)
    .post(users.create)
    
router.route('/:id')
    .get(users.findOne)
    .post(users.createComm)
    .put(users.update)
    .delete(users.delete)

router.route('/edit')
    .patch(users.update)

module.exports = router;