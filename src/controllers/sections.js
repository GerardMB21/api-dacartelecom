//models
const { Campaigns } = require("../models/campaigns");
const { Products } = require("../models/products");
const { Sections } = require("../models/sections");

//utils
const { catchAsync } = require("../utils/catchAsync");

//controllers
const create = catchAsync(async (req,res,next)=>{
    const { name,description,campaignId } = req.body;

    const newSection = await Sections.create({
        name,
        description,
        campaignId
    });

    res.status(200).json({
        status: 'success',
        newSection
    });
});

const update = catchAsync(async (req,res,next)=>{
    const { section } = req;
    const { name,description } = req.body;

    if (name) {
        await section.update({
            name
        });
    };

    if (description) {
        await section.update({
            description
        });
    };

    res.status(201).json({
        status: 'success'
    });
});

const deleted = catchAsync(async (req,res,next)=>{
    const { section } = req;

    await section.update({
        status: !section.status
    });

    res.status(201).json({
        status: 'success'
    });
});

const getItems = catchAsync(async (req,res,next)=>{
    const data = await Sections.findAll({
        where:{
            status: true
        },
        include:[
            {
                model: Campaigns,
                required: false,
                where:{
                    status: true
                },
                attributes: ['id','name','description','createdAt','updatedAt']
            },
            {
                model: Products,
                required: false,
                where:{
                    status: true
                },
                attributes: ['id','name','description','createdAt','updatedAt']
            }
        ],
        attributes: ['id','name','description','createdAt','updatedAt']
    });

    res.status(200).json({
        status: 'success',
        data
    });
});

const getItemsAdmin = catchAsync(async (req,res,next)=>{
    const data = await Sections.findAll({
        where:{
            status: false
        },
        include:[
            {
                model: Campaigns,
            },
            {
                model: Products,
            }
        ]
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
    getItems,
    getItemsAdmin,
}