const { body, validationResult } = require('express-validator');

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

const sectionsValidator = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
    body('campaignId').isNumeric().withMessage('Input a valid campaign Id'),
	checkResult,
];

module.exports = { sectionsValidator };