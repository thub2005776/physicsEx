const express = require('express');
const doc = require('../controllers/doc.controller');

const router = express.Router();

router.route('/')
    .get(doc.findAll)
    .post(doc.create)

router.route('/:id')
    .post(doc.update)
    .delete(doc.deleteOne)

module.exports = router;