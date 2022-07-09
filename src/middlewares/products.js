//Models
const { Products } = require('../models/SQL/products');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const productExist = catchAsync(async (req,res,next)=>{
	const { id } = req.params;

	const product = await Products.findOne({ where:{
		id,
		status: true
	} });

	if (!product) {
		return next(new AppError('Product not found',404));
	}

	req.product = product

	next()
});

module.exports = {
	productExist
};