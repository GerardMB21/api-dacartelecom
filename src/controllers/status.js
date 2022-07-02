const { Status } = require("../models/SQL/status");
const { catchAsync } = require("../utils/catchAsync");

const getItems = catchAsync(async (req,res,next)=>{
    const data = await Status.findAll({
        where:{
            status:'active'
        },
        attributes:['id','name','createdAt','updatedAt']
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
    const newStatus = await Status.create({
        name,
        status:"active"
    })
    
    res.status(201).json({
        status: 'succes',
        newStatus
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