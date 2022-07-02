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

const turnsValidator = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
	body('entrance_time').notEmpty().withMessage('Entrance time cannot be empty'),
	body('exit_time').notEmpty().withMessage('Exit time cannot be empty'),
	checkResult,
];

module.exports = { turnsValidator };