const { body, validationResult } = require('express-validator');

//models
const { Campaigns } = require('../models/SQL/campaigns');
const { Sections } = require('../models/SQL/sections');

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

const checkCampSect = async (req,res,next)=>{
	const { campaignId,sectionId } = req.body;

	const campaign = await Campaigns.findOne({
		where:{
			id: campaignId,
			status: true
		}
	})

	if (!campaign) {
		return next(new AppError('Campaign Id invalid try other Id',404));
	};
    
	const section = await Sections.findOne({
		where:{
			id: sectionId,
			status: true
		}
	})

	if (!section) {
		return next(new AppError('Section Id invalid try other Id',404));
	};

	next()
};

const productsValidator = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
    body('campaignId').isNumeric().withMessage('Invalid parameter, try with a number'),
    body('sectionId').isNumeric().withMessage('Invalid parameter, try with a number'),
	checkResult,
	checkCampSect,
];

const updateValidator = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
	checkResult,
];

module.exports = { 
	productsValidator,
	updateValidator
};