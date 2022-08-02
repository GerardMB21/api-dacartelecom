//models
const { Roles } = require('../models/roles');

//utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const roleExist = catchAsync(async (req,res,next)=>{
	const { id } = req.params;

	const role = await Roles.findOne({
		where:{
			id
		}
	});

	if (!role) {
		return next(new AppError('Role not found',404));
	}

	req.role = role

	next()
});

module.exports = {
	roleExist,
};