const express = require('express');
const thematics = require('../controllers/thematic.controller');

const router = express.Router();

router.route('/')
    .get(thematics.findAll)
    .post(thematics.create)
    .delete(thematics.delete)

router.route('/update')
    .put(thematics.update)


module.exports = router;