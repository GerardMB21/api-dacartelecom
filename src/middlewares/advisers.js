// Models
const { Advisers } = require('../models/advisers');
const { Campaigns } = require('../models/campaigns');
const { Roles } = require('../models/roles');
const { Sections } = require('../models/sections');
const { Users } = require('../models/users');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const adviserExists = catchAsync(async (req, res, next) => {
	const { adviserId } = req.params;

	const adviser = await Advisers.findOne({ 
		where: { 
			id: adviserId,
			status:true
		},
		include: [
			{
				model: Users,
                required: false,
                where:{
                    status: true
                },
                include:[
                    {
                        model:Roles,
                        required: false,
                        where:{
                            status: true
                        },
                        attributes: ['id','name','description','createdAt','updatedAt']
                    },
                    {
                        model:Campaigns,
                        required: false,
                        where:{
                            status: true
                        },
                        attributes: ['id','name','createdAt','updatedAt']
                    },
                    {
                        model:Sections,
                        required: false,
                        where:{
                            status: true
                        },
                        attributes: ['id','name','createdAt','updatedAt']
                    },
                ],
                attributes: ['id','email','name','lastName','createdAt','updatedAt']
			},
			{
				model: Campaigns,
                required: false,
                where:{
                    status: true
                },
				attributes: ['id','name','description','createdAt','updatedAt']
			},
			{
				model: Sections,
                required: false,
                where:{
                    status: true
                },
				attributes: ['id','name','description','createdAt','updatedAt']
			}
		]
	});

	if (!adviser) {
		return next(new AppError('Adviser not found', 404));
	};

	req.adviser = adviser;

    console.log('passed adviser');
	next();
});

const adviserStatus = catchAsync(async (req, res, next) => {
	const { adviserId } = req.params;

	const adviser = await Advisers.findOne({ 
		where: { 
			id: adviserId,
		},
		include: [
			{
				model: Users,
                required: false,
                where:{
                    status: true
                },
                include:[
                    {
                        model:Roles,
                        required: false,
                        where:{
                            status: true
                        },
                        attributes: ['id','name','description','createdAt','updatedAt']
                    },
                    {
                        model:Campaigns,
                        required: false,
                        where:{
                            status: true
                        },
                        attributes: ['id','name','createdAt','updatedAt']
                    },
                    {
                        model:Sections,
                        required: false,
                        where:{
                            status: true
                        },
                        attributes: ['id','name','createdAt','updatedAt']
                    },
                ],
                attributes: ['id','email','name','lastName','createdAt','updatedAt']
			},
			{
				model: Campaigns,
                required: false,
                where:{
                    status: true
                },
				attributes: ['id','name','description','createdAt','updatedAt']
			},
			{
				model: Sections,
                required: false,
                where:{
                    status: true
                },
				attributes: ['id','name','description','createdAt','updatedAt']
			}
		]
	});

	if (!adviser) {
		return next(new AppError('Adviser not found', 404));
	};

	req.adviser = adviser;

	next();
});

module.exports = { 
    adviserExists,
    adviserStatus
};