//Models
const { Campaigns } = require('../models/campaigns');
const { Products } = require('../models/products');
const { Sections } = require('../models/sections');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const productExist = catchAsync(async (req,res,next)=>{
	const { productId } = req.params;

	const product = await Products.findOne({ 
        where:{
            id: productId,
        },
        include:[
            {
                model: Campaigns,
                required: false,
                where:{
                    status: true
                },
            },
            {
                model: Sections,
                required: false,
                where:{
                    status: true
                },
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
};