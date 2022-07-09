//models
const { Campaigns } = require("../models/SQL/campaigns");
const { Products } = require("../models/SQL/products");
const { Sections } = require("../models/SQL/sections");

//utils
const { catchAsync } = require("../utils/catchAsync");

//controllers
const create = catchAsync(async (req,res,next)=>{
    const { name,campaignId,sectionId } = req.body;

    const newProduct = await Products.create({
        name,
        campaignId,
        sectionId
    });

    res.status(200).json({
        status: 'success',
        newProduct
    });
});

const update = catchAsync(async (req,res,next)=>{
    const { product } = req;
    const { name } = req.body;

    await product.update({
        name
    });

    res.status(201).json({
        status: 'success'
    });
});

const deleted = catchAsync(async (req,res,next)=>{
    const { product } = req;

    await product.update({
        status: false
    });

    res.status(201).json({
        status: 'success'
    });
});

const getItems = catchAsync(async (req,res,next)=>{
    const data = await Products.findAll({
        where:{
            status: true
        },
        include:[
            {
                model: Campaigns,
                attributes: ['id','name','createdAt','updatedAt']
            },
            {
                model: Sections,
                attributes: ['id','name','createdAt','updatedAt']
            }
        ],
        attributes: ['id','name','createdAt','updatedAt']
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
};