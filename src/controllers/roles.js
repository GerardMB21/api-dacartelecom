//models
const { Roles } = require("../models/roles");

//utils
const { catchAsync } = require("../utils/catchAsync");

//controllers
const create = catchAsync(async (req,res,next)=>{
    const { name,description } = req.body;

    const newRole = await Roles.create({
        name,
        description
    });

    res.status(200).json({
        status: 'success',
        newRole
    });
});

const update = catchAsync(async (req,res,next)=>{
    const { role } = req;
    const { name,description } = req.body;

    if (name) {
        await role.update({
            name
        });
    };

    if (description) {
        await role.update({
            description
        });
    };

    res.status(201).json({
        status: 'success'
    });
});

const deleted = catchAsync(async (req,res,next)=>{
    const { role } = req;
    const { status } = req.body;

    await role.update({
        status
    });

    res.status(201).json({
        status: 'success'
    });
});

const getItems = catchAsync(async (req,res,next)=>{
    const data = await Roles.findAll();

    res.status(201).json({
        status: 'success',
        data
    });
});

module.exports = {
    create,
    update,
    deleted,
    getItems,
};