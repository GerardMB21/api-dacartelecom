//models
const { Campaigns } = require('../models/campaigns');
const { Products } = require('../models/products');
const { Sections } = require('../models/sections');

//utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const sectionExist = catchAsync(async (req,res,next)=>{
	const { id } = req.params;

	const section = await Sections.findOne({ 
        where:{
		id,
		status: true
        },
        include:[
            {
                model: Campaigns,
                required: false,
                where:{
                    status: true
                },
                attributes: ['id','name','description','createdAt','updatedAt']
            },
            {
                model: Products,
                required: false,
                where:{
                    status: true
                },
                attributes: ['id','name','description','createdAt','updatedAt']
            }
        ]
    });

	if (!section) {
		return next(new AppError('Role not found',404));
	}

	req.section = section

	next()
});

const sectionStatus = catchAsync(async (req,res,next)=>{
	const { id } = req.params;

	const section = await Sections.findOne({ 
        where:{
		id
        },
        include:[
            {
                model: Campaigns,
            },
            {
                model: Products,
            }
        ]
    });

	if (!section) {
		return next(new AppError('Role not found',404));
	}

	req.section = section

	next()
});

module.exports = {
	sectionExist,
    sectionStatus
};