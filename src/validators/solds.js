const { body, validationResult } = require('express-validator');

//models

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

const soldsValidator = [
	body('sold').isNumeric().withMessage('Invalid sold try again'),
    body('dayTime').notEmpty().withMessage('Day and Time cannot be empty'),
	checkResult,
];

module.exports = { 
	soldsValidator,
};