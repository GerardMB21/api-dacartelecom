//models
const { Campaigns } = require('../models/campaigns');
const { Products } = require('../models/products');
const { Sections } = require('../models/sections');

//utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const sectionExist = catchAsync(async (req,res,next)=>{
	const { sectionId } = req.params;

	const section = await Sections.findOne({ 
        where:{
            id: sectionId
        },
        include:[
            {
                model: Campaigns,
                required: false,
                where:{
                    status: true
                },
            },
            {
                model: Products,
                required: false,
                where:{
                    status: true
                },
            }
        ]
    });

	if (!section) {
		return next(new AppError('Role not found',404));
	}

	req.section = section

	next();
});

module.exports = {
	sectionExist,
};