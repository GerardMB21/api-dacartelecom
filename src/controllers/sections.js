//models
const { Campaigns } = require("../models/SQL/campaigns");
const { Products } = require("../models/SQL/products");
const { Sections } = require("../models/SQL/sections");

//utils
const { catchAsync } = require("../utils/catchAsync");

const create = catchAsync(async (req,res,next)=>{
    const { name,campaignId } = req.body;

    const newSection = await Sections.create({
        name,
        campaignId
    });

    res.status(200).json({
        status: 'success',
        newSection
    });
});

const update = catchAsync(async (req,res,next)=>{
    const { section } = req;
    const { name } = req.body;

    await section.update({
        name
    });

    res.status(201).json({
        status: 'success'
    });
});

const deleted = catchAsync(async (req,res,next)=>{
    const { section } = req;

    await section.update({
        status: false
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
                attributes: ['id','name','createdAt','updatedAt']
            },
            {
                model: Products,
                attributes: ['id','name','createdAt','updatedAt']
            }
        ],
        attributes: ['id','name','createdAt','updatedAt']
    });

    res.status(200).json({
        status: 'success',
        data
    })
})

module.exports = {
    create,
    update,
    deleted,
    getItems
}