//models
const { Roles } = require('../models/SQL/roles');

//utils
const { catchAsync } = require('../utils/catchAsync');

//controllers
const create = catchAsync(async (req,res,next)=>{
    const { name } = req.body;
    
    const roles = await Roles.create({
        name
    })

    res.status(200).json({
        status: 'succes',
        roles
    })
});

const update = catchAsync(async (req,res,next)=>{
    const { role } = req;
    const { name } = req.body;

    await role.update({
        name
    });

    res.status(201).json({
        status: 'success'
    });
});

const deleted = catchAsync(async (req,res,next)=>{
    const { role } = req;

    await role.update({
        status: false
    });

    res.status(201).json({
        status: 'success'
    });
});

const getItems = catchAsync(async (req,res,next)=>{
    const data = await Roles.findAll({
        where: {
            status: true
        }
    });

    res.status(200).json({
        status: 'success',
        data
    });
}) 

module.exports = {
    create,
    update,
    deleted,
    getItems
}