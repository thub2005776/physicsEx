const express = require('express');
const thematics = require('../controllers/thematic.controller');

const router = express.Router();

router.route('/')
    .get(thematics.findAll)
    .post(thematics.create)
    
router.route('/:id')
    .post(thematics.update)
    .delete(thematics.delete)


module.exports = router;