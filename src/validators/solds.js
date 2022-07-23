const { body, validationResult } = require('express-validator');

//models
const { Advisers } = require('../models/advisers');
const { Products } = require('../models/products');

//utils
const { AppError } = require('../utils/appError');

const checkResult = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// Array has errors
		const errorMsgs = errors.array().map(err => err.msg);

		const message = errorMsgs.join('. ');

		return next(new AppError(message, 400));
	}

	next();
};

const checkParameters = async (req,res,next)=>{
	const { adviserId,productId } = req.body;
    
    const adviser = await Advisers.findOne({
        where:{
            id: adviserId,
            status: true
        }
    });

    if (!adviser) {
        return next(new AppError('Adviser Id invalid try other Id',404));
    };
    
	const product = await Products.findOne({
		where:{
			id: productId,
			status: true
		}
	});

	if (!product) {
		return next(new AppError('Product Id invalid try other Id',404));
	};

	next()
};

const soldsValidator = [
	body('sold').isNumeric().withMessage('Invalid sold try again'),
    body('dayTime').notEmpty().withMessage('Day and Time cannot be empty'),
    body('productId').isNumeric().withMessage('Invalid parameter, try with a number'),
	checkResult,
	checkParameters,
];

module.exports = { 
	soldsValidator,
};