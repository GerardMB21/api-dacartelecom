//models
const { Turns } = require("../models/SQL/turns");

//utils
const { catchAsync } = require("../utils/catchAsync");

const create = catchAsync(async (req,res,next)=>{
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
});

const update = catchAsync(async (req,res,next)=>{
    const { turn } = req;
    const { name,entrance_time,exit_time } = req.body;

    await turn.update({
        name,
        entrance_time,
        exit_time
    })

    res.status(201).json({
        status: 'success'
    })
});

const deleted = catchAsync(async (req,res,next)=>{
    const { turn } = req;

    await turn.update({
        status: false
    })

    res.status(201).json({
        status: 'success'
    })
});

const getItems = catchAsync(async (req,res,next)=>{
    const data = await Turns.findAll({
        where: {
            status: true
        }
    });

    res.status(200).json({
        status: 'success',
        data
    });
});

module.exports = {
    create,
    update,
    deleted,
    getItems
}