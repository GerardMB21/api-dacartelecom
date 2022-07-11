const { body, validationResult } = require('express-validator');

//models
const { Roles } = require('../models/SQL/roles');
const { Storage } = require('../models/SQL/storage');
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
	const { roleId,userId,storageId } = req.body;

	const role = await Roles.findOne({
		where:{
			id: roleId,
			status: true
		}
	});

	if (!role) {
		return next(new AppError('Role dont exists',404));
	};

	const user = await Users.findOne({
		where:{
			id: userId,
            roleId,
			status: true
		}
	});

	if (!user) {
		return next(new AppError('User not avaliable',404));
	};

	const storage = await Storage.findOne({
		where:{
			id: storageId,
			status: true
		}
	});

	if (!storage) {
		return next(new AppError('File not avaliable',404));
	};

	next();
};

const dataValidator = [
	body('file_name').notEmpty().withMessage('File name cannot be empty'),
    body('roleId').isNumeric().withMessage('Role Id invalid try again'),
	body('userId').isNumeric().withMessage('User Id invalid try again'),
	body('storageId').isNumeric().withMessage('storage Id invalid try again'),
    checkResult,
	checkParameters,
];

const updateValidator = [
	body('file_name').notEmpty().withMessage('File name cannot be empty'),
    checkResult,
];

module.exports = { 
	dataValidator,
    updateValidator
};