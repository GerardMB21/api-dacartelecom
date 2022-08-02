const { body, validationResult } = require('express-validator');

//models
const { Campaigns } = require('../models/campaigns');
const { Roles } = require('../models/roles');
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
	const { roleId, campaignId, sectionId } = req.body;
	const roles = ['supervisor','asesor'];

	const role = await Roles.findOne({
		where: {
			id:roleId,
			status:true
		}
	});

	if (!role) {
		return next(new AppError('Role Id invalid try other Id',400));
	};

	if (roles.includes(role.name)) {
		if (!campaignId) {
			return next(new AppError('Invalid parameter, try with a number',404))
		}

		const campaign = await Campaigns.findOne({
			where:{
				id:campaignId,
				status: true
			}
		});

		if (!campaign) {
			return next(new AppError('Campaign Id invalid try other Id', 404));
		};

		if (!sectionId) {
			return next(new AppError('Invalid parameter, try with a number',404))
		}

		const section = await Sections.findOne({
			where:{
				id:sectionId,
				campaignId: campaign.id,
				status:true
			}
		});

		if (!section) {
			return next(new AppError('Section Id invalid try other Id', 404));
		};
	};

	next()
};

const userValidator = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
    body('lastName').notEmpty().withMessage('Last name cannot be empty'),
	body('email').isEmail().withMessage('Must provide a valid email'),
	body('password')
		.isLength({ min: 5 })
		.withMessage('Password must be at least 5 characters long')
		.isAlphanumeric()
		.withMessage('Password must contain letters and numbers'),
	body('roleId').isNumeric().withMessage('Invalid parameter, try with a number'),
	checkResult,
	checkParameters,
];

module.exports = { 
	userValidator,
 };