const { body, validationResult } = require('express-validator');

//models
const { Campaigns } = require('../models/SQL/campaigns');
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
	const { userId,campaignId,sectionId } = req.body;

    const user = await Users.findOne({
        where:{
            id: userId,
            status: true,
            roleId: 2
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

	next()
};

const investmentsValidator = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
    body('inversion').isNumeric().withMessage('Invalid parameter, try with a number'),
    body('date').isDate().withMessage('Invalid date try again'),
    body('userId').isNumeric().withMessage('Invalid parameter, try with a number'),
    body('campaignId').isNumeric().withMessage('Invalid parameter, try with a number'),
    body('sectionId').isNumeric().withMessage('Invalid parameter, try with a number'),
	checkResult,
	checkParameters,
];

const updateValidator = [
    body('inversion').isNumeric().withMessage('Invalid parameter, try with a number'),
	checkResult,
];

module.exports = { 
	investmentsValidator,
	updateValidator
};