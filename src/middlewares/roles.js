//Models

// Utils
const { Roles } = require('../models/SQL/roles');
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const roleExist = catchAsync(async (req,res,next)=>{
	const { id } = req.params;

	const role = await Roles.findOne({ where:{
		id
	} });

	if (!role) {
		return next(new AppError('Role not found',404));
	}

	req.role = role

	next()
})

const rolePermission = catchAsync(async (req,res,next)=>{
    const { permission } = req;

	if (!permission) {
		return next(new AppError('You dont have permission',401));
	};

    next()

})

module.exports = { 
	rolePermission,
	roleExist
};