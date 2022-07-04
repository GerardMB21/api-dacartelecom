const { Roles } = require('../models/SQL/roles');
const { catchAsync } = require('../utils/catchAsync');

const getItems = catchAsync(async (req,res,next)=>{
    const data = await Roles.findAll({
        where:{
            status:true
        },
        attributes:['id','name','createdAt','updatedAt']
    });

    res.status(200).json({
        status: 'succes',
        data
    });
})

const getItem = catchAsync(async (req,res,next)=>{
    const { role } = req;

    res.status(200).json({
        status: 'succes',
        role
    })
})

const createItem = catchAsync(async (req,res,next)=>{
    const { name } = req.body;
    const roles = await Roles.create({
        name,
        statusId:1
    })

    res.status(200).json({
        status: 'succes',
        roles
    })
})

const updateItem = catchAsync(async (req,res,next)=>{
    const { role } = req;
    const { name } = req.body;

    await role.update({
        name
    })

    res.status(200).json({
        status: 'succes'
    })
})

const deleteItem = catchAsync(async (req,res,next)=>{
    const { role } = req;

    await role.update({
        status:false
    })

    res.status(200).json({
        status: 'succes'
    })
})

module.exports = {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
}