//Models
const { Turns } = require('../models/SQL/turns');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const turnExist = catchAsync(async (req,res,next)=>{
	const { id } = req.params;

	const turn = await Turns.findOne({ where:{
		id,
		status: true
	} });

	if (!turn) {
		return next(new AppError('Turn not found',404));
	}

	req.turn = turn

	next()
});

module.exports = {
	turnExist
};