const { body, validationResult } = require('express-validator');

//models
const { Advisers } = require('../models/SQL/advisers');
const { Campaigns } = require('../models/SQL/campaigns');
const { Products } = require('../models/SQL/products');
const { Sections } = require('../models/SQL/sections');
const { Users } = require('../models/SQL/users');

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
	const { adviserId,userId,campaignId,sectionId,productId } = req.body;
    
    const adviser = await Advisers.findOne({
        where:{
            id: adviserId,
            userId,
            status: true
        }
    });

    if (!adviser) {
        return next(new AppError('Adviser Id invalid try other Id',404));
    };

    const user = await Users.findOne({
        where:{
            id: userId,
            status: true,
            roleId: 4
        }
    });

    if (!user) {
        return next(new AppError('User Id invalid try other Id',404));
    };

	const campaign = await Campaigns.findOne({
		where:{
			id: campaignId,
			status: true
		}
	});

	if (!campaign) {
		return next(new AppError('Campaign Id invalid try other Id',404));
	};
    
	const section = await Sections.findOne({
		where:{
			id: sectionId,
			status: true
		}
	});

	if (!section) {
		return next(new AppError('Section Id invalid try other Id',404));
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
    body('adviserId').isNumeric().withMessage('Invalid parameter, try with a number'),
    body('userId').isNumeric().withMessage('Invalid parameter, try with a number'),
    body('campaignId').isNumeric().withMessage('Invalid parameter, try with a number'),
    body('sectionId').isNumeric().withMessage('Invalid parameter, try with a number'),
    body('productId').isNumeric().withMessage('Invalid parameter, try with a number'),
	checkResult,
	checkParameters,
];

const updateValidator = [
	body('sold').isNumeric().withMessage('Invalid sold try again'),
	checkResult,
];

module.exports = { 
	soldsValidator,
	updateValidator
};