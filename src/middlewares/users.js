// Models
const { Campaigns } = require('../models/campaigns');
const { Roles } = require('../models/roles');
const { Sections } = require('../models/sections');
const { Users } = require('../models/users');

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
                required: false,
                where:{
                    status: true
                },
			},
			{
				model: Campaigns,
                required: false,
                where:{
                    status: true
                },
			},
			{
				model: Sections,
                required: false,
                where:{
                    status: true
                },
			}
		],
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