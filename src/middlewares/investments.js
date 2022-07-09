//Models
const { Investments } = require('../models/SQL/investments');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const investmentExist = catchAsync(async (req,res,next)=>{
	const { id } = req.params;

	const investment = await Investments.findOne({ where:{
		id,
		status: true
	} });

	if (!investment) {
		return next(new AppError('Investment not found',404));
	}

	req.investment = investment

	next()
});

module.exports = {
	investmentExist
};