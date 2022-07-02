const { Roles } = require('../models/SQL/roles');
const { Status } = require('../models/SQL/status');
const { catchAsync } = require('../utils/catchAsync');

const getItems = catchAsync(async (req,res,next)=>{
    const data = await Roles.findAll({
        attributes:['id','name','createdAt','updatedAt'],
        include:[
            {
                model:Status,
                attributes:['name']
            }
        ]
    });

    res.status(200).json({
        status: 'succes',
        data
    });
})

const getItem = (req,res)=>{

}

const createItem = catchAsync(async (req,res,next)=>{
    const { name } = req.body;
    const roles = await Roles.create({
        name,
        statusId:1
    })

    res.status(201).json({
        status: 'succes',
        roles
    })
})

const updateItem = (req,res)=>{

}

const deleteItem = (req,res)=>{

}

module.exports = {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
}