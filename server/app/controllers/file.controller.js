const ApiError = require('../api-error');

exports.upload = async (req, res, next) => {
    try {
        if(req.file) {
            return res.json("Uploaded")
        } else return next(new ApiError(400, "File is not empty"));
        
    } catch (err) {
        return next(new ApiError(500, err));
    }
}