const { Turns } = require("../models/SQL/turns");
const { catchAsync } = require("../utils/catchAsync");

const getItems = catchAsync(async (req,res,next)=>{
    const data = await Turns.findAll({
        attributes:['id','name','entrance_time','exit_time','createdAt','updatedAt']
    });

    res.status(200).json({
        status: 'succes',
        data
    });
})

const getItem = (req,res)=>{

}

const createItem = catchAsync(async (req,res,next)=>{
    const { name,entrance_time,exit_time } = req.body;
    const newTurn = await Turns.create({
        name,
        entrance_time,
        exit_time
    })
    
    res.status(201).json({
        status: 'succes',
        newTurn
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