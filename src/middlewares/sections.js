//Models
const { Sections } = require('../models/SQL/sections');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const sectionExist = catchAsync(async (req,res,next)=>{
	const { id } = req.params;

	const section = await Sections.findOne({ where:{
		id,
		status: true
	} });

	if (!section) {
		return next(new AppError('Role not found',404));
	}

	req.section = section

	next()
});

module.exports = {
	sectionExist
};