// Models
const { Campaigns } = require('../models/SQL/campaigns');
const { Roles } = require('../models/SQL/roles');
const { Sections } = require('../models/SQL/sections');
const { Turns } = require('../models/SQL/turns');
const { Users } = require('../models/SQL/users');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const userExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const user = await Users.findOne({ 
		where: { 
			id,
			status:true
		},
		include: [
			{
				model: Roles,
				attributes: ['id','name','createdAt','updatedAt']
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

	if (!user) {
		return next(new AppError('User not found', 404));
	};

	req.user = user;

	next();
});

module.exports = { 
    userExists,
};