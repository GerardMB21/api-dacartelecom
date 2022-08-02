//Models
const { Solds } = require('../models/solds');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const soldExist = catchAsync(async (req,res,next)=>{
	const { soldId } = req.params;

	const sold = await Solds.findOne({
        where:{
			id: soldId,
			status: true
        } 
    });

	if (!sold) {
		return next(new AppError('Sold not found',404));
	}

	req.sale = sold

	next()
});

module.exports = {
	soldExist,
};