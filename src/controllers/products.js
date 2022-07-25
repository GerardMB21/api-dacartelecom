//models
const { Campaigns } = require("../models/campaigns");
const { Products } = require("../models/products");
const { Sections } = require("../models/sections");

//utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

//controllers
const create = catchAsync(async (req,res,next)=>{
    const { name,description,campaignId,sectionId } = req.body;

    const newProduct = await Products.create({
        name,
        description,
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
    const { name,description } = req.body;

    if (name) {
        await product.update({
            name
        });
    };

    if (description) {
        await product.update({
            description
        });
    };

    res.status(201).json({
        status: 'success'
    });
});

const deleted = catchAsync(async (req,res,next)=>{
    const { product } = req;

    await product.update({
        status: !product.status
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
                required: false,
                where:{
                    status: true
                },
                attributes: ['id','name','description','createdAt','updatedAt']
            },
            {
                model: Sections,
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
    const data = await Products.findAll({
        where:{
            status: false
        },
        include:[
            {
                model: Campaigns,
            },
            {
                model: Sections,
            }
        ]
    });

    if (!data.length) {
        return next(new AppError('Products not found',404));
    };

    res.status(200).json({
        status: 'success',
        data
    });
});

const getQuery = catchAsync(async (req,res,next)=>{
    const { campaignId,sectionId } = req.query;


    const searchProducts = await Products.findAll({
        where: {
            status: 'active'
        },
    });

    res.status(200).json({
        status: 'success',
        searchProducts
    });
});

module.exports = {
    create,
    update,
    deleted,
    getItems,
    getItemsAdmin,
    getQuery,
};