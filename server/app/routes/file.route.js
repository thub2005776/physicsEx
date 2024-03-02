const express = require('express');
const multer = require('multer');
const path = require('path');
const file = require('../controllers/file.controller');

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../user/src/assets/')
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.substring(0, file.originalname.indexOf('.'));
        cb(null, fileName + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), file.upload);
router.post('/upload/:json', upload.single('file'), file.uploadJSON);
router.delete('/remove/:img', file.remove)

module.exports = router;