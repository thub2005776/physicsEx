const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

class FileService {
    constructor(file) {
        this.file = file;
    }

    // UpLoad file 
 storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../../../user/src/assets')
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.substring(0, file.originalname.indexOf('.'));
        cb(null, fileName + "_" + Date.now() + path.extname(file.originalname));
    }
})

upload = multer({
    storage: storage
});
 removeFile = (img) => {
    (async () => {
        try {
            await fs.unlink('../../../user/src/assets/' + img);
        } catch (e) {
            console.log(e);
        }
    })();
}

}

module.exports = FileService;