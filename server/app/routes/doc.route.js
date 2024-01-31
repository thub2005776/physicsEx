const express = require('express');
const doc = require('../controllers/doc.controller');

const router = express.Router();

router.route('/')
    .get(doc.findAll)
    .post(doc.create)
    .delete(doc.deleteOne)

router.route('/update')
    .put(doc.update)

module.exports = router;