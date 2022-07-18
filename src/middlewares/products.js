//Models
const { Campaigns } = require('../models/campaigns');
const { Products } = require('../models/products');
const { Sections } = require('../models/sections');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const productExist = catchAsync(async (req,res,next)=>{
	const { id } = req.params;

	const product = await Products.findOne({ 
        where:{
		id,
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
        ]
    });

	if (!product) {
		return next(new AppError('Product not found',404));
	}

	req.product = product

	next()
});

const productStatus = catchAsync(async (req,res,next)=>{
	const { id } = req.params;

	const product = await Products.findOne({ 
        where:{
		id
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
        ]
    });

	if (!product) {
		return next(new AppError('Product not found',404));
	}

	req.product = product

	next()
});

module.exports = {
	productExist,
    productStatus
};