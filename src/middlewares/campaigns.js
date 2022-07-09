//Models
const { Campaigns } = require('../models/SQL/campaigns');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const campaignExist = catchAsync(async (req,res,next)=>{
	const { id } = req.params;

	const campaign = await Campaigns.findOne({ where:{
		id,
		status: true
	} });

	if (!campaign) {
		return next(new AppError('Campaign not found',404));
	}

	req.campaign = campaign

	next()
});

module.exports = {
	campaignExist
};