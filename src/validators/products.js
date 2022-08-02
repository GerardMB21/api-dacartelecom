const { body, validationResult } = require('express-validator');

//models
const { Campaigns } = require('../models/campaigns');
const { Sections } = require('../models/sections');

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
	const { campaignId,sectionId } = req.body;

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
			campaignId: campaign.id,
			status: true
		}
	});

	if (!section) {
		return next(new AppError('Section Id invalid try other Id',404));
	};

    if (section.campaignId !== campaign.id) {
        return next(new AppError('This section does not belong to this campaign'))
    }

	next()
};

const productsValidator = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
    body('description').notEmpty().withMessage('Please write a brief description of the role'),
    body('campaignId').isNumeric().withMessage('Invalid parameter, try with a number'),
    body('sectionId').isNumeric().withMessage('Invalid parameter, try with a number'),
	checkResult,
	checkParameters,
];

module.exports = { 
	productsValidator
};