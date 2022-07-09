//models

//utils
const { Data } = require("../models/SQL/data");
const { catchAsync } = require("../utils/catchAsync");

//controllers
const create = catchAsync(async (req,res,next)=>{
    const { file_name,roleId,userId } = req.body;
    const regex = /\s/g;
    const nameFile = file_name.replace(regex,"-");
    const filename = `${nameFile}`;

    const newFile = await Data.create({
        file_name: filename,
        roleId,
        userId
    });

    res.status(200).json({
        status: 'success',
        newFile
    });
});

const update = catchAsync(async (req,res,next)=>{
    const { data } = req;
    const { file_name } = req.body;
    const regex = /\s/g;
    const nameFile = file_name.replace(regex,"-");
    const filename = `${nameFile}`;

    await data.update({
        file_name: filename
    });

    res.status(201).json({
        status: 'success'
    });
});

const deleted = catchAsync(async (req,res,next)=>{
    const { data } = req;

    await data.update({
        status: false
    });

    res.status(201).json({
        status: 'success'
    });
});

const getItems = catchAsync(async (req,res,next)=>{
    const data = await Data.findAll({
        where:{
            status: true
        }
    });

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
})

module.exports = {
    create,
    update,
    deleted,
    getItems,
    getItem
};