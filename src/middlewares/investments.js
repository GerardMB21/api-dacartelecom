//Models
const { Investments } = require('../models/investments');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const investmentExist = catchAsync(async (req,res,next)=>{
	const { investmentId } = req.params;

	const investment = await Investments.findOne({ where:{
		id: investmentId,
		status: true
	} });

	if (!investment) {
		return next(new AppError('Investment not found',404));
	}

	req.inversion = investment

	next()
});

module.exports = {
	investmentExist,
};