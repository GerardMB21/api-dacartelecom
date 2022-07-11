const { body, validationResult } = require('express-validator');

//models
const { Campaigns } = require('../models/SQL/campaigns');
const { Sections } = require('../models/SQL/sections');
const { Turns } = require('../models/SQL/turns');
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
	const { userId,campaignId,sectionId,turnId } = req.body;

	const user = await Users.findOne({
		where:{
			id: userId,
			status: true,
			roleId: 4
		}
	});

	if (!user) {
		return next(new AppError('User not avaliable',404));
	};

	const campaign = await Campaigns.findOne({
		where:{
			id: campaignId,
			status: true
		}
	});

	if (!campaign) {
		return next(new AppError('Campaign dont exists',404));
	};

	const section = await Sections.findOne({
		where:{
			id: sectionId,
			status: true
		}
	});

	if (!section) {
		return next(new AppError('Section dont exists',404));
	};

	const turn = await Turns.findOne({
		where:{
			id: turnId,
			status: true
		}
	});

	if (!turn) {
		return next(new AppError('Turn dont exists',404));
	};

	next();
};

const adviserValidator = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
    body('last_name').notEmpty().withMessage('Last name cannot be empty'),
	body('email').isEmail().withMessage('Must provide a valid email'),
	body('password')
		.isLength({ min: 5 })
		.withMessage('Password must be at least 5 characters long')
		.isAlphanumeric()
		.withMessage('Password must contain letters and numbers'),
    body('userId').isNumeric().withMessage('User Id not valid'),
    body('campaignId').isNumeric().withMessage('Campaign Id not valid'),
    body('sectionId').isNumeric().withMessage('Section Id not valid'),
    body('turnId').isNumeric().withMessage('Turn not valid'),
	checkResult,
	checkParameters,
];

const updateValidator = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
    body('last_name').notEmpty().withMessage('Last name cannot be empty'),
	body('userId').isNumeric().withMessage('User Id not valid'),
	body('campaignId').isNumeric().withMessage('Campaign Id not valid'),
	body('sectionId').isNumeric().withMessage('Section Id not valid'),
	body('turnId').isNumeric().withMessage('Turn not valid'),
	checkResult,
	checkParameters,
];

const passwordValidator = [
	body('password')
		.isLength({ min: 5 })
		.withMessage('Password must be at least 5 characters long')
		.isAlphanumeric()
		.withMessage('Password must contain letters and numbers'),
		checkResult,
];

module.exports = { 
	adviserValidator,
	updateValidator,
	passwordValidator
};