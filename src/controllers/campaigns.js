//models
const { Campaigns } = require("../models/campaigns");
const { Products } = require("../models/products");
const { Sections } = require("../models/sections");

//utils
const { catchAsync } = require("../utils/catchAsync");

//controllers
const create = catchAsync(async (req,res,next)=>{
    const { name,description } = req.body;

    const newCampaign = await Campaigns.create({
        name,
        description
    });

    res.status(200).json({
        status: 'success',
        newCampaign
    });
});

const update = catchAsync(async (req,res,next)=>{
    const { campaign } = req;
    const { name,description } = req.body;

    if (name) {
        await campaign.update({
            name
        });
    };

    if (description) {
        await campaign.update({
            description
        });
    };

    res.status(201).json({
        status: 'success'
    });
});

const deleted = catchAsync(async (req,res,next)=>{
    const { campaign } = req;
    const { status } = req.body;

    await campaign.update({
        status
    });

    res.status(200).json({
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
            required: false,
            where:{
                status: true
            },
            include: {
                model: Products,
                required: false,
                where:{
                    status: true
                },
            },
        },
    });

    res.status(200).json({
        status: 'success',
        data
    });
});

const getItem = catchAsync(async (req,res,next)=>{
    const { campaign } = req;

    res.status(200).json({
        stattus: 'success',
        campaign
    });
});

const getAllItems = catchAsync(async (req,res,next)=>{

    const data = await Campaigns.findAll({
        where:{
            status: false
        },
        include: {
            model: Sections,
            include: {
                model: Products,
            },
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
    getItems,
    getItem,
    getAllItems,
}