const multer = require('multer');

//models
const { Storage } = require('../models/SQL/storage');

//utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        const { userSession } = req;

        const pathstorage = `${__dirname}/../storage/${userSession.role}`
        
        cb(null,pathstorage);
    },
    filename: function (req,file,cb){
        const ext = file.originalname.split('.').pop();
        const filename = `file-${Date.now()}.${ext}`;
        cb(null,filename);
    }
});

const uploadMiddleware = multer({ storage });

const fileExist = catchAsync(async (req,res,next)=>{
    const { id } = req.params;

    const file = await Storage.findOne({
        where:{
            id,
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
