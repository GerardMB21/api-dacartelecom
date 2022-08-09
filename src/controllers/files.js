const { ref, uploadBytes, getDownloadURL } = require('firebase/storage')

//models
const { Files } = require("../models/files");
const { Users } = require('../models/users');
const { Roles } = require('../models/roles');

//utils
const { catchAsync } = require("../utils/catchAsync");
const { storage }  = require('../utils/firebase');
const { AppError } = require('../utils/appError');

//controllers
const create = catchAsync(async (req,res,next)=>{
    const { userSession } = req;
    const { fileName } = req.body;

    console.log(req.file);
    const ext = req.file.originalname.split('.').pop();
    const filename = `files/${userSession.role}/file-${Date.now()}.${ext}`;
    const fileRef = ref(storage,filename);
    const fileRes = await uploadBytes(fileRef,req.file.buffer);
    const url = await getDownloadURL(ref(storage,fileRes.metadata.fullPath));

    const newFile = await Files.create({
        fileName,
        userId: userSession.id,
        url,
        role: userSession.role
    });

    res.status(201).json({
        status: 'success',
        newFile
    });
});

const update = catchAsync(async (req,res,next)=>{
    const { file,userSession } = req;
    const { fileName,permission } = req.body;

    if (userSession.id !== file.userId) {
        return next(new AppError('You don the owner this file',403));
    };

    if (fileName) {
        await file.update({
            fileName
        });
    };

    if (permission) {
        await file.update({
            permission
        });
    };

    res.status(200).json({
        status: 'success'
    });
});

const deleted = catchAsync(async (req,res,next)=>{
    const { file,userSession } = req;

    if (userSession.id !== file.userId) {
        return next(new AppError('You don the owner this file',403));
    };

    await file.update({
        status: false
    });

    res.status(200).json({
        status: 'success'
    });
});

const getItems = catchAsync(async (req,res,next)=>{
    const { userSession } = req;
    const { offSet,limit } = req.query;

    const data = [];

    const searchFiles = await Files.findAll({
        where:{
            role: userSession.role,
            status: true
        },
        include:[
            {
                model: Users,
                required: false,
                where:{
                    status: true
                },
                include:{
                    model: Roles,
                    required: false,
                    where:{
                        status: true
                    },
                },
                attributes: { exclude: ['password'] }
            }
        ],
    });

    for (let i = offSet; i < searchFiles.length; i++) {
        if (data.length < limit) {
            data.push(searchFiles[i])
        };
    };

    if (!data.length) {
        return next(new AppError('This area dont have files',404));
    };

    res.status(200).json({
        status: 'success',
        data
    });
});

const getPermission = catchAsync(async (req,res,next)=>{
    const { userSession } = req;

    const data = await Files.findAll({
        where:{
            permission: userSession.id,
            status: true
        },
        include:[
            {
                model: Users,
                required: false,
                where:{
                    status: true
                },
                include:{
                    model: Roles,
                    required: false,
                    where:{
                        status: true
                    },
                },
                attributes: { exclude: ['password'] }
            }
        ],
    });

    if (!data.length) {
        return next(new AppError('You do not have permission to view files from other areas',403));
    };

    res.status(200).json({
        status: 'success',
        data
    });
});

const permissionNull = catchAsync(async (req,res,next)=>{
    const { file,userSession } = req;

    if (file.permission !== userSession.id) {
        return next(new AppError('You dont have permission',403));
    }

    await file.update({
        permission: null
    });

    res.status(200).json({
        status:'success'
    });
});

const getQuery = catchAsync(async (req,res,next)=>{
    const { userSession } = req;
    const { name } = req.query;

    const data = [];

    const searchFiles = await Files.findAll({
        where:{
            role: userSession.role,
            status: true
        },
        include:[
            {
                model: Users,
                required: false,
                where:{
                    status: true
                },
                include:{
                    model: Roles,
                    required: false,
                    where:{
                        status: true
                    },
                },
                attributes: { exclude: ['password'] }
            }
        ],
    });

    searchFiles.map(file=>{
        if (file.fileName.includes(name)) {
            data.push(file);
        };
    });

    if (!data.length) {
        return next(new AppError('Not found files with name',404));
    };

    res.status(200).json({
        status: 'success',
        data
    });
});

module.exports = {
    create,
    update,
    deleted,
    getItems,
    getPermission,
    permissionNull,
    getQuery,
};