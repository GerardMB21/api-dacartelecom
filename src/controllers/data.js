//models
const { Data } = require("../models/SQL/data");
const { Roles } = require("../models/SQL/roles");
const { Storage } = require("../models/SQL/storage");
const { Users } = require("../models/SQL/users");

//utils
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

//controllers
const create = catchAsync(async (req,res,next)=>{
    const { file_name,roleId,userId,storageId } = req.body;
    const regex = /\s/g;
    const nameFile = file_name.replace(regex,"-");
    const filename = `${nameFile}`;

    const newFile = await Data.create({
        file_name: filename,
        roleId,
        userId,
        storageId
    });

    res.status(200).json({
        status: 'success',
        newFile
    });
});

const update = catchAsync(async (req,res,next)=>{
    const { data,userSession } = req;
    const { file_name } = req.body;

    const regex = /\s/g;
    const nameFile = file_name.replace(regex,"-");
    const filename = `${nameFile}`;

    if (parseInt(data.userId) !== parseInt(userSession.id)) {
        return next(new AppError('You dont owner this file',403));
    };

    await data.update({
        file_name: filename
    });

    res.status(201).json({
        status: 'success'
    });
});

const deleted = catchAsync(async (req,res,next)=>{
    const { data,userSession } = req;

    if (parseInt(data.userId) !== parseInt(userSession.id)) {
        return next(new AppError('You dont owner this file',403));
    };

    await data.update({
        status: false
    });

    res.status(201).json({
        status: 'success'
    });
});

const getItems = catchAsync(async (req,res,next)=>{
    const { userSession } = req;

    const data = await Data.findAll({
        where:{
            status: true,
            roleId: userSession.roleId
        },
        include:[
            {
                model: Roles,
                attributes: ['id','name','createdAt','updatedAt']
            },
            {
                model: Users,
                attributes: ['id','email','name','last_name','createdAt','updatedAt']
            },
            {
                model: Storage,
                attributes: ['id','url','createdAt','updatedAt']
            }
        ],
        attributes: ['id','file_name','permission','userId','createdAt','updatedAt']
    });

    if (!data.length) {
        return next(new AppError('This area dont have files'))
    }

    res.status(200).json({
        status: 'success',
        data
    });
});

const getItem = catchAsync(async (req,res,next)=>{
    const { data } = req;

    res.status(200).json({
        status: 'success',
        data
    })
});

const getPermission = catchAsync(async (req,res,next)=>{
    const { userSession } = req;

    const data = await Data.findAll({
        where:{
            permission: userSession.id,
            status: true
        },
        include:[
            {
                model: Roles,
                attributes: ['id','name','createdAt','updatedAt']
            },
            {
                model: Users,
                attributes: ['id','email','name','last_name','createdAt','updatedAt']
            },
            {
                model: Storage,
                attributes: ['id','url','createdAt','updatedAt']
            }
        ],
        attributes: ['id','file_name','permission','userId','createdAt','updatedAt']
    });

    if (!data.length) {
        return next(new AppError('Dont have permission other files'))
    }

    res.status(201).json({
        status: 'success',
        data
    });
});

const updatePermission = catchAsync(async (req,res,next)=>{
    const { data,userSession } = req;
    const { permission } = req.body;

    if ((parseInt(data.userId) === parseInt(userSession.id)) || (parseInt(data.permission) === parseInt(userSession.id))) {

        await data.update({
            permission: permission
        });
    
        return res.status(201).json({
            status: 'success'
        });
    };

    next(new AppError('You dont owner this file',403));
});

module.exports = {
    create,
    update,
    updatePermission,
    deleted,
    getItems,
    getItem,
    getPermission
};