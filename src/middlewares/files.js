const multer = require('multer');

//models
const { Files } = require('../models/files');

//utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const storage = multer.memoryStorage();

const uploadMiddleware = multer({ storage });

const fileExist = catchAsync(async (req,res,next)=>{
    const { fileId } = req.params;

    const file = await Files.findOne({
        where:{
            id: fileId,
            status: true
        }
    });

    if (!file) {
        return next(new AppError('File not found',404));
    };

    req.file = file;

    next()
})

module.exports = {
    uploadMiddleware,
    fileExist
}