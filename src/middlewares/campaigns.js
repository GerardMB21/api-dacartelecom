//Models
const { Campaigns } = require('../models/campaigns');
const { Products } = require('../models/products');
const { Sections } = require('../models/sections');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const campaignExist = catchAsync(async (req,res,next)=>{
	const { id } = req.params;

	const campaign = await Campaigns.findOne({ 
		where:{
		id,
		status: true
		},
        include: {
            model: Sections,
            required: false,
            where:{
                status: true
            },
            include: {
                model: Products,
                required: false,
                where:{
                    status: true
                },
                attributes: ['id','name','description','createdAt','updatedAt']
            },
            attributes: ['id','name','description','createdAt','updatedAt']
        }
	});

	if (!campaign) {
		return next(new AppError('Campaign not found',404));
	}

	req.campaign = campaign

	next()
});

const campaignStatus = catchAsync(async (req,res,next)=>{
	const { id } = req.params;

	const campaign = await Campaigns.findOne({ where:{
		id
	} });

	if (!campaign) {
		return next(new AppError('Campaign not found',404));
	}

	req.campaign = campaign

	next()
});

module.exports = {
	campaignExist,
	campaignStatus
};