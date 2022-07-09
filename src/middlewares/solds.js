//Models
const { Solds } = require('../models/SQL/solds');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const soldExist = catchAsync(async (req,res,next)=>{
	const { id } = req.params;

	const sold = await Solds.findOne({ where:{
		id,
		status: true
	} });

	if (!sold) {
		return next(new AppError('Sold not found',404));
	}

	req.sale = sold

	next()
});

module.exports = {
	soldExist
};