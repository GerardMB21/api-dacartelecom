//Models
const { Roles } = require('../models/SQL/roles');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const roleExist = catchAsync(async (req,res,next)=>{
	const { id } = req.params;

	const role = await Roles.findOne({ where:{
		id,
		status: true
	} });

	if (!role) {
		return next(new AppError('Role not found',404));
	}

	req.role = role

	next()
});

module.exports = {
	roleExist
};