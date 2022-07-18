const { body, validationResult } = require('express-validator');

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

const investmentsValidator = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
    body('investment').isNumeric().withMessage('Invalid parameter, try with a number'),
    body('day').isDate().withMessage('Invalid date try again'),
	checkResult,
];

module.exports = { 
	investmentsValidator
};