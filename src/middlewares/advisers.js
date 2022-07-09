// Models
const { Advisers } = require('../models/SQL/advisers');
const { Campaigns } = require('../models/SQL/campaigns');
const { Roles } = require('../models/SQL/roles');
const { Sections } = require('../models/SQL/sections');
const { Turns } = require('../models/SQL/turns');
const { Users } = require('../models/SQL/users');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const adviserExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const adviser = await Advisers.findOne({ 
		where: { 
			id,
			status:true
		},
		include: [
			{
				model: Users,
                include:[
                    {
                        model:Campaigns,
                        attributes: ['id','name','createdAt','updatedAt']
                    },
                    {
                        model:Sections,
                        attributes: ['id','name','createdAt','updatedAt']
                    },
                ],
                attributes: ['id','email','name','last_name','img_profile','createdAt','updatedAt']
			},
			{
				model: Campaigns,
				attributes: ['id','name','createdAt','updatedAt']
			},
			{
				model: Sections,
				attributes: ['id','name','createdAt','updatedAt']
			},
			{
				model: Turns,
				attributes: ['id','name','entrance_time','exit_time','createdAt','updatedAt']
			}
		],
        attributes: ['id','email','password','name','last_name','img_profile','createdAt','updatedAt']
	});

	if (!adviser) {
		return next(new AppError('Adviser not found', 404));
	};

	req.adviser = adviser;

	next();
});

module.exports = { 
    adviserExists,
};