//Models
const { Data } = require('../models/SQL/data');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const dataExist = catchAsync(async (req,res,next)=>{
	const { id } = req.params;

	const data = await Data.findOne({ where:{
		id,
		status: true
	} });

	if (!data) {
		return next(new AppError('Data not found',404));
	}

	req.data = data

	next()
});

module.exports = {
	dataExist
};