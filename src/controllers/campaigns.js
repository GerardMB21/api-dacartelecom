//models
const { Campaigns } = require("../models/SQL/campaigns");
const { Products } = require("../models/SQL/products");
const { Sections } = require("../models/SQL/sections");

//utils
const { catchAsync } = require("../utils/catchAsync");

//controllers
const create = catchAsync(async (req,res,next)=>{
    const { name } = req.body;

    const newCampaign = await Campaigns.create({
        name
    });

    res.status(200).json({
        status: 'success',
        newCampaign
    })
});

const update = catchAsync(async (req,res,next)=>{
    const { campaign } = req;
    const { name } = req.body;

    await campaign.update({
        name
    });

    res.status(201).json({
        status: 'success'
    });
});

const deleted = catchAsync(async (req,res,next)=>{
    const { campaign } = req;

    await campaign.update({
        status: false
    });

    res.status(201).json({
        status: 'success'
    });
});

const getItems = catchAsync(async (req,res,next)=>{

    const data = await Campaigns.findAll({
        where:{
            status: true
        },
        include: {
            model: Sections,
            include: {
                model: Products,
                attributes: ['id','name','createdAt','updatedAt']
            },
            attributes: ['id','name','createdAt','updatedAt']
        },
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